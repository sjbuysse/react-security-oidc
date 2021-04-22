import React, { useContext, useEffect, useState } from "react";
import { ClientForm, Client, getClient, editClient } from "clients";
import { match, useRouteMatch, useHistory } from "react-router-dom";
import { FetchContext } from "../../../auth/context/FetchContext";
import axios from "axios";

export function EditClient() {
  const {
    params: { clientId },
  }: match<{ clientId: string }> = useRouteMatch();
  const { push } = useHistory();
  const authAxios = useContext(FetchContext);
  const [client, setClient] = useState<Client | undefined>(undefined);
  const goBackToClients = () => push("/clients");
  const retrieveClient = async () => {
    const result = (await authAxios(`/clients/${clientId}`)).data;
    setClient(result);
  };
  const onEditClient = async (clientFields: Partial<Client>) => {
    const updatedClient = { ...client!, ...clientFields };
    await authAxios.put(`/clients/${updatedClient.id}`, updatedClient);
    goBackToClients();
  };

  useEffect(() => {
    retrieveClient();
    // eslint-disable-next-line
  }, []);

  return client ? (
    <ClientForm
      client={client}
      onSubmit={onEditClient}
      onCancel={goBackToClients}
    ></ClientForm>
  ) : null;
}
