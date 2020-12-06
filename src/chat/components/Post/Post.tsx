import React from 'react';
import { Message } from '../../models';
import { formatISOTimeStringToHHMM } from '../Chatbox/date-format.functions';

interface Props {
    message: Message;
}

export const Post = ({message}: Props) => {
    return (
        <div className='flex flex-col leading-5 my-1'>
            <div className='flex justify-between'><span className='font-bold'>{message.username}:</span>
                <span>{formatISOTimeStringToHHMM(message.createdAt)}</span></div>
            <span className='font-light'>{message.message}</span>
        </div>
    )
}
