import React, { useState, useEffect } from "react";
import { Client } from "../../types/Client";
import { getClients } from "../../services/clients";
import { Table, Page } from "../../../components";

export function ClientsTable() {
    const [clients, setClients] = useState<Client[] | undefined>(undefined);

    useEffect(async () => {
        const fetchedClients = await getClients();
        setClients(fetchedClients);
    }, []);

    return (
        <Page title="Products" onCreateButtonClick={() => {}}>
            <Table
                headers={[ "Id", "Name" ]}
                data={clients}
                onEdit={() => {}}
                onDelete={() => {}}
            ></Table>
        </Page>
    );
}
