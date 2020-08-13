import { Client } from "../models";

const apiUrl = "https://base-app-backend.herokuapp.com/clients";

export const getClient = async (id: string): Promise<Client> =>
    (await fetch(`${apiUrl}/${id}`)).json();

export const getClients = async (): Promise<Client[]> =>
  (await fetch(apiUrl)).json();

export const createClient = async (
    client: Partial<Client>
): Promise<Client> =>
    (
        await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(client),
        })
    ).json();

export const editClient = async (client: Client): Promise<Client[]> =>
    (
        await fetch(`${apiUrl}/${client.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(client),
        })
    ).json();
