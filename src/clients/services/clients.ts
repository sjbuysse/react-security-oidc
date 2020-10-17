import { Client } from "../model";

const apiUrl = "https://base-app-backend.herokuapp.com/clients";

export const getClients = async (): Promise<Client[]> =>
  (await fetch(apiUrl)).json();

