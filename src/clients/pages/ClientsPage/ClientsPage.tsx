import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
    match,
    useHistory,
} from "react-router-dom";
import { Page } from '../../../components';
import { ClientsTable, CreateClient, EditClient } from '../../containers';

export function ClientsPage() {
    const {url, path}: match = useRouteMatch();
    const {push} = useHistory();
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
                <Page title="Edit client">
                    <EditClient></EditClient>
                </Page>
            </Route>
        </Switch>
    );
}
