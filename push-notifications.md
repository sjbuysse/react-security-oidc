# Push Notifications, the frontend part

After we've setup our cloud functions that function as a REST API we can setup our frontend.
We will use the firebase library to implement push notifications. 
Ps. It's important to note that the PUSH API only works on Chrome & Firefox, so use one of these browsers.

## Setup firebase in your project

Start a new firebase project (we have already done this for you), and activate the messaging feature.
When you go to the Settings of your firebase project, and look under the `Cloud Messaging` tab, you can find a 
`Sender ID`. We have done this for you, and the `Sender ID` that you need is 319381111953.
We need to add this information to the `manifest.json` of our project like this: 
```
  "gcm_sender_id": "319381111953",
```

To use messaging feature of firebase in our client, we need to install it. 
```
npm install firebase --save
```

We will also need to configure and initialize the firebase library.
create a file `src/fire.ts` with following content.
For now we will only import the `messaging` and the `firestore` features of firebase. 
We need the `firestore` feature of because we want to store the messaging tokens that our clients receive, 
this way our cloud function can push a notification to all the clients whose messaging token is saved to the database.
We will use the config of the `ordina-push-notification` firebase project that we've created for you.
ps. it's okay to expose the API key, this is just an identification of your firebase project, security is implemented elsewhere.
```
import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAh2uomua8n1hLapc-khRL4IewcyM2bRaE",
    authDomain: "ordina-push-notification.firebaseapp.com",
    databaseURL: "https://ordina-push-notification.firebaseio.com",
    projectId: "ordina-push-notification",
    storageBucket: "ordina-push-notification.appspot.com",
    messagingSenderId: "319381111953",
    appId: "1:319381111953:web:d698437c3e24aa5e5d6b30",
    measurementId: "G-31K5XCP8HS"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();
const firestore = firebase.firestore();
```

Now in same file let's make a `requestFirebaseNotificationPermission` function that we can use to request a
messaging token from firebase. This function uses the `messaging.getToken()` function which also will trigger a browser 
permission request to the user to use the browser's PUSH api.

Then in our function we will save the received token in the database (firestore), if it is not there already.  
```
export const requestFirebaseNotificationPermission = (serviceWorkerRegistration?: ServiceWorkerRegistration) =>
    messaging
        .requestPermission()
        .then(() => !!serviceWorkerRegistration ? messaging.getToken({serviceWorkerRegistration}) : messaging.getToken())
        .then(token => saveTokenIfNotInDatabase(token))
        .then(() => messaging)

const saveTokenIfNotInDatabase = (token: string | null | undefined): Promise<any> => {
    if (!token) {
        return Promise.reject('no token');
    } else {
        console.log('token received: ' + token);
        return getDoesTokenExistInDatabase(token)
            .then((getDoesTokenExistInDatabase: boolean) => {
                if (!getDoesTokenExistInDatabase) {
                    return saveTokenToFirestore(token)
                } else {
                    console.log('Token already registered');
                    return Promise.resolve(token)
                }
            });
    }
}

const getDoesTokenExistInDatabase = (token: string): Promise<boolean> => {
    return firestore.collection('devices').get().then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        let existingTokens: any[] = [];
        querySnapshot.forEach((doc) => existingTokens = [...existingTokens, doc.data().token])
        return existingTokens.includes(token);
    })
}

const saveTokenToFirestore = (token: string): Promise<string> => {
    const device = {
        id: 'device-' + Math.random(),
        token
    };
    return firestore.collection('devices').add(device).then(() => token);
}
```

There is one more thing we need to do before we can use this function to listen to Notifications on the frontend
& that is to create a 'firebase-messaging-sw.js' file in the `public` folder of our project. This file will hold
all the service worker logic to make the messaging also work when your app is closed, but for now we can just keep it empty.

```
touch `public/firebase-messaging-sw.js`
```

## Chat feature

I have created some basics in your chat feature, to speed this workshop up. 
In the `chat/components` folder you can see that there is a `Chatbox` component,
which is just a dumb form component that holds very little logic. It's just 2 input fields and a list of messages.
There is also an effect that will automatically scroll to the bottom of the messages, when the messages are updated.
And there is a `Post` component that the `Chatbox` uses to render the messages with some styling.
Have a look at the components & you'll see it's really basic stuff.

Your job now is first to create a service that can call the API to get the messages, or to send a new message.
And then secondly you'll create a container component for our chat feature, that will hold the logic to toggle the chatbox open/closed
and the logic to call our service.

### Service

Create a new file `chat/services/messages.ts`, 
We're going to create a `GET` and a `POST` request. 
```
import { Message } from '../models';

const apiUrl = "https://us-central1-ordina-push-notification.cloudfunctions.net/message";

export const getMessages = async (): Promise<Message[]> =>
    (await fetch(`${apiUrl}`)).json();

export const createMessage = async (
    message: Partial<Message>
): Promise<Message> =>
    (
        await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        })
    ).json();
```

### Container component

Create a file for our container component. I'm doing this in the `src/chat/containers/Chat` folder.
```
mkdir ./src/chat/containers
mkdir ./src/chat/containers/Chat
touch ./src/chat/containers/Chat/Chat.tsx
```

What does this component need to do?
1. Toggle our chatbox open & closed. 
2. Request all the existing messages and pass them to our `Chatbox` component.
3. Setup a callback function to call the `createMessage` function in our service, and pass it down to the `Chatbox` function.
4. Call our `requestFirebaseNotificationPermission`, to initialize the firebase messaging feature. Upon success, we need to
define a listener that listens for new messages.
5. When our listener receives a new message, it needs to update the `messages` that our component passes down to the `Chatbox` component.

Let's start with step 1
```tsx
export const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (<div className='absolute bottom-0 right-0'>
        {isOpen
            ? <Chatbox messages={[]} handleSubmit={message => console.log('we should call createMessage in our service')}
                                     handleClose={() => setIsOpen(false)}/>
            : <Textballoon onClick={() => setIsOpen(true)} className={'m-3'}/>
        }
    </div>)
}
```

I think the code is pretty self-explanatory, but don't forget to add this component to your `App` component.
I would just add it at the end of the wrapping `div`.
```
import { getMessages } from '../../services/messages';
//...

export const Chat = () => {
    // ...
    const [messages, setMessages] = useState<Message[]>([])

    const retrieveMessages = async () => {
        const result = await getMessages();
        setMessages(currentMessages => [...currentMessages, ...result]);
    };

    useEffect(() => {
        retrieveMessages();
    }, [])

    return (<div className='absolute bottom-0 right-0'>
        {isOpen
            ? <Chatbox messages={messages} handleSubmit={message => console.log('we should call createMessage in our service')}
                                           handleClose={() => setIsOpen(false)}/>
            : <Textballoon onClick={() => setIsOpen(true)} className={'m-3'}/>
        }
    </div>)
}
```
Now we should already see some exisiting messages in our chatbox!

Let's set up a callback so that we can actually save a new message.
```
import { createMessage, getMessages } from '../../services/messages';
//...

export const Chat = () => {
    //...
    const sendMessage = async (message: Partial<Message>) => {
            await createMessage(message)
    }
    
    //...

    return (<div className='absolute bottom-0 right-0'>
        {isOpen
            ? <Chatbox messages={messages} handleSubmit={sendMessage} handleClose={() => setIsOpen(false)}/>
            : <Textballoon onClick={() => setIsOpen(true)} className={'m-3'}/>
        }
    </div>)
}
```
Now we can even send new messages, we'll still have to refresh and request all messages to actualy see the result in our chatbox
since we haven't setup our listener yet. That is what we'll do now with step 4. and 5.

Import and call the `requestFirebaseNotificationPermission` from `fire.ts`, to initialize the firebase messaging feature.
This promise resolves and returns a reference to the whole `messaging` feature from our firebase setup.
In this object there is a function `onMessage` defined, which accepts a callback function as an argument.
In other words, we call define a callback that needs to be called whenever we receive a message.
This is where step 5 comes in and in this callback function we update the state of the `messages` that is being passed down
to the `Chatbox` component. 
```
import React, { useEffect, useState } from 'react';
import { Textballoon } from '../../../components/Icons/Textballoon';
import { Chatbox } from '../../components/Chatbox/Chatbox';
import { requestFirebaseNotificationPermission } from '../../../fire';
import { Message } from '../../models';
import { createMessage, getMessages } from '../../services/messages';

export const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])

    const retrieveMessages = async () => {
        const result = await getMessages();
        setMessages(currentMessages => [...currentMessages, ...result]);
    };

    const sendMessage = async (message: Partial<Message>) => {
            await createMessage(message)
    }

    const addMessage = (message: Message) => setMessages(currentMessages => [...currentMessages, message])

    useEffect(() => {
        retrieveMessages();
    }, [])

    useEffect(() => {
        requestFirebaseNotificationPermission()
            .then(messaging => messaging.onMessage(payload => addMessage(payload.data)))
            .catch(function (err) {
                console.log('Service worker registration failed, error:', err);
            });
    }, [])

    return (<div className='absolute bottom-0 right-0'>
        {isOpen
            ? <Chatbox messages={messages} handleSubmit={sendMessage} handleClose={() => setIsOpen(false)}/>
            : <Textballoon onClick={() => setIsOpen(true)} className={'m-3'}/>
        }
    </div>)
}
```

If you didn't go step by step and just copied this final solution, let me point out again that you'll have to
add the `Chat` component to your `App` component. I would just add it at the end inside the wrapping `div`.
