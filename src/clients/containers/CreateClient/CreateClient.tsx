import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Client, ClientForm } from "clients";
import { FetchContext } from "../../../auth/contexts/FetchContext";

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
