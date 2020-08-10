import { Client } from "../types";

const apiUrl = "http://localhost:8080/clients";

export const getClients = async (): Promise<Client[]> =>
  (await fetch(`${apiUrl}`)).json();
