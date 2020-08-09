import React, { useState, useEffect } from "react";
import { Client } from "../../types/Client";
import { getClients } from "../../services/clients";
import { Table, Page } from "../../../components";

interface ClientTableData {
    id: string;
    name: string;
}

export function ClientsTable() {
    const [clients, setClients] = useState<Client[] | undefined>(undefined);
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
                onEdit={() => {}}
                onDelete={() => {}}
            ></Table>
    );
}
