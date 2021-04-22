import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Client, ClientForm, createClient } from "clients";
import axios from "axios";
import { FetchContext } from "../../../auth/context/FetchContext";

export function CreateClient() {
  const { push } = useHistory();
  const authAxios = useContext(FetchContext);
  const goBackToClients = () => push("/clients");
  const onCreateClient = async (newClient: Partial<Client>) => {
    await authAxios.post("/clients", newClient);
    goBackToClients();
  };

  return (
    <ClientForm
      onSubmit={onCreateClient}
      onCancel={goBackToClients}
    ></ClientForm>
  );
}
