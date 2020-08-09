import React from 'react';
<<<<<<< HEAD
import {
    Switch,
    Route,
    useRouteMatch,
    match,
    useHistory,
} from "react-router-dom";
import { Page } from '../../../components';
import { ClientsTable } from '../../containers/ClientsTable/ClientsTable';
import { CreateClient } from 'clients';

export function ClientsPage() {
    const { url, path }: match = useRouteMatch();
    const { push } = useHistory();
    const gotToCreateClient = () => push(`${url}/create`);

    return (
        <Switch>
            <Route exact path={path}>
                <Page title="Clients" onCreateButtonClick={gotToCreateClient}>
                    <ClientsTable></ClientsTable>
                </Page>
            </Route>
            <Route path={`${path}/create`}>
                <Page title="Create client">
                    <CreateClient></CreateClient>
                </Page>
            </Route>
            <Route path={`${path}/:clientId/edit`}>
                <Page title="Edit client" >
                    Here will come the EditClient container
                </Page>
            </Route>
        </Switch>
    );
}
=======

export const ClientsPage = () => (
    <h2>Here comes the clients page</h2>
)
>>>>>>> Add solution to ch04
