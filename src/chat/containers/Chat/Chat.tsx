import React, { useEffect, useState } from 'react';
import { Textballoon } from '../../../components/Icons/Textballoon';
import { Chatbox } from '../../components/Chatbox/Chatbox';
import { requestFirebaseNotificationPermission } from '../../../fire';
import * as serviceWorker from '../../../serviceWorker';
import { Message } from '../../models';
import { createMessage, getMessages } from '../../services';

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
        if (process.env.NODE_ENV !== 'production') {
            requestFirebaseNotificationPermission()
                .then(messaging => messaging.onMessage(payload => addMessage(payload.data)))
                .catch(function (err) {
                    console.log('Service worker registration failed, error:', err);
                });
        } else {
            serviceWorker.register({
                onSuccess: (registration) => {
                    requestFirebaseNotificationPermission(registration)
                        .then(messaging => messaging.onMessage(payload => addMessage(payload.data)))
                        .catch(function (err) {
                            console.log('Service worker registration failed, error:', err);
                        });
                }
            });
        }
    }, [])

    return (<div className='absolute bottom-0 right-0'>
        {isOpen
            ? <Chatbox messages={messages} handleSubmit={sendMessage} handleClose={() => setIsOpen(false)}/>
            : <Textballoon onClick={() => setIsOpen(true)} className={'m-3'}/>
        }
    </div>)
}
