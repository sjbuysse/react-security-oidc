// fire.ts
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

firebase.firestore().enablePersistence().catch((err) => {
    if (err.code === 'failed-precondition') {
        console.log('You have opened multiple tabs with the app, only the first will work properly offline');
    } else if (err.code === 'unimplemented') {
        console.log('this browser does not support offline perisitance, data might not be displayed correctly');
    }
});
const firestore = firebase.firestore();

const messaging = firebase.messaging();

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
