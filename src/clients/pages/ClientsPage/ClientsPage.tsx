import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
    match,
    useHistory,
} from "react-router-dom";
import { Page } from '../../../components';
import { ClientsTable } from '../../containers/ClientsTable/ClientsTable';

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
                    Here will come the CreateClient container
                </Page>
            </Route>
            <Route path={`${path}/:clientId/edit`}>
                <Page title="Edit client">
                    Here will come the EditClient container
                </Page>
            </Route>
        </Switch>
    );
}
