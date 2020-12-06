import React, { useEffect, useRef, useState } from 'react';
import { PaperPlane } from '../../../components/Icons/PaperPlane';
import { Post } from '../Post/Post';
import { Message } from '../../models';
import { Cross } from '../../../components/Icons/Cross';
import { InputFieldBase } from '../../../components/InputFieldBase/InputFieldBase';

interface Props {
    messages: Message[];
    handleClose: () => void;
    handleSubmit: (message: Partial<Message>) => void
}

export const Chatbox = ({messages, handleClose, handleSubmit}: Props) => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const submitMessage = async (e: any) => {
        e.preventDefault();
        if (message.length > 0 && username.length > 0) {
            setMessage('');
            handleSubmit({message, username})
        }
    }

    const scrollToEndOfMessages = (behavior: 'smooth' | 'auto' = 'smooth') => messagesEndRef.current!.scrollIntoView({behavior: behavior})

    useEffect(() => {
        scrollToEndOfMessages('auto');
    }, [messages])

    useEffect(() => {
        scrollToEndOfMessages();
    }, [messages])

    return <div className='m-1'>
        <div className='h-8 bg-primary-500 flex justify-end text-center'><Cross className='my-auto mx-2'
                                                                                onClick={handleClose}/></div>
        <form onSubmit={submitMessage} className='flex flex-col p-2 bg-primary-900 border-2 border-primary-500 w-56'>
            <InputFieldBase hasFocus={true} name='username' className='mb-2' placeholder='username' value={username}
                            onChange={(e) => setUsername(e.target.value)}
            ></InputFieldBase>
            <div className='flex flex-col h-64 overflow-y-scroll'>
                {messages.map(currentMessage => <Post message={currentMessage} key={currentMessage.createdAt}/>)}
                <div ref={messagesEndRef}/>
            </div>
            <div className='flex align-center mt-4'>
                <InputFieldBase name='message' placeholder='message' value={message}
                                onChange={(e) => setMessage(e.target.value)}
                ></InputFieldBase>
                <button className='ml-2 my-auto' type='submit' style={{height: 'fit-content'}}
                        disabled={username.length === 0 || message.length === 0}>
                    <PaperPlane/>
                </button>
            </div>
        </form>
    </div>
}
