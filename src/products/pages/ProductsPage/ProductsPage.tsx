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

export function ProductsPage() {
  const { url }: match = useRouteMatch();
  const { push } = useHistory();

  const gotToCreateProduct = () => push(`${url}/create`);

  return (
      <Switch>
        <Route exact path={url}>
          <Page title="Products" onCreateButtonClick={gotToCreateProduct}>
            <ProductsTable></ProductsTable>
          </Page>
        </Route>
        <Route path={`${url}/create`}>
          <Page title="Create product">
            <CreateProduct></CreateProduct>
          </Page>
        </Route>
        <Route path={`${url}/:productId/edit`}>
          <Page title="Edit product">
            <EditProduct></EditProduct>
          </Page>
        </Route>
      </Switch>
  );
}