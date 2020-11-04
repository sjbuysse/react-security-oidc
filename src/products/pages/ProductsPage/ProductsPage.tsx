import React from "react";
import {
    Switch,
    Route,
    useRouteMatch,
    match,
    useHistory,
} from "react-router-dom";
import { Page } from "components";
import { ProductsTable } from "products";
import { EditProduct, CreateProduct } from "products/containers";
import { Dialog } from '../../../components/Dialog/Dialog';

export function ProductsPage() {
    const {url}: match = useRouteMatch();
    const {push} = useHistory();

    const goToCreateProduct = () => push(`${url}/create`);


    return (
        <>
            <Page title="Products" onCreateButtonClick={goToCreateProduct}>
                <ProductsTable></ProductsTable>
            </Page>
            <Switch>
                <Route path={`${url}/create`}>
                    <Dialog show={true} title={'Create product'}
                            onClose={() => push(url)}><CreateProduct></CreateProduct></Dialog>
                </Route>
                <Route path={`${url}/:productId/edit`}>
                    <Dialog show={true} title={'Edit product'}
                            onClose={() => push(url)}><EditProduct></EditProduct></Dialog>
                </Route>
            </Switch>
        </>
    );
}

