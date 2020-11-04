import React, { useState, useEffect } from "react";
import { Client } from "../../models";
import { deleteClient, getClients } from "../../services";
import { Table } from "components";
import { match, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectIsReadOnly } from '../../../state/selectors';

interface ClientTableData {
    id: string;
    name: string;
}

export function ClientsTable() {
    const [clients, setClients] = useState<Client[] | undefined>(undefined);
    const { url }: match = useRouteMatch();
    const { push } = useHistory();
    const isReadOnly = useSelector(selectIsReadOnly);
    const retrieveClients = async () => {
        const result = await getClients();
        setClients(result);
    };

    useEffect(() => {
        retrieveClients();
    }, []);

    const onDeleteClient = async (id: string) => {
        if (window.confirm("Are you sure?")) {
            await deleteClient(id);
            await retrieveClients();
        }
    };

    const clientTableData = clients?.map<ClientTableData>((client) => ({
        id: client.id,
        name: `${client.firstName} ${client.lastName}`,
    }));

    return (
            <Table
                headers={[ "Id", "Name" ]}
                data={clientTableData}
                isReadOnly={isReadOnly}
                onEdit={(clientId) => push(`${url}/${clientId}/edit`)}
                onDelete={onDeleteClient}
            ></Table>
    );
}
