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

