import { Client } from "../models";

const apiUrl = "https://base-app-backend.herokuapp.com/clients";

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
