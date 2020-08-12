import React from "react";
import { useHistory } from "react-router-dom";
import { Client, ClientForm, createClient } from "clients";

export function CreateClient() {
  const { push } = useHistory();
  const goBackToClients = () => push("/clients");
  const onCreateClient = async (newClient: Partial<Client>) => {
    await createClient(newClient);
    goBackToClients();
  };

  return (
    <ClientForm
      onSubmit={onCreateClient}
      onCancel={goBackToClients}
    ></ClientForm>
  );
}
