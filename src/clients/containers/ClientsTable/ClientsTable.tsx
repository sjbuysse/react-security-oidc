import React, { useState, useEffect } from "react";
import { Client } from "../../models";
import { getClients } from "../../services";
import { Table } from "components";
import { match, useRouteMatch, useHistory } from "react-router-dom";

interface ClientTableData {
    id: string;
    name: string;
}

export function ClientsTable() {
    const [clients, setClients] = useState<Client[] | undefined>(undefined);
    const { url }: match = useRouteMatch();
    const { push } = useHistory();
    const retrieveClients = async () => {
        const result = await getClients();
        setClients(result);
    };

    useEffect(() => {
        retrieveClients();
    }, []);

    const clientTableData = clients?.map<ClientTableData>((client) => ({
        id: client.id,
        name: `${client.firstName} ${client.lastName}`,
    }));

    return (
            <Table
                headers={[ "Id", "Name" ]}
                data={clientTableData}
                onEdit={(clientId) => push(`${url}/${clientId}/edit`)}
                onDelete={(clientId) => {console.log(`in the future this ${clientId} might come in handy.`)}}
            ></Table>
    );
}
