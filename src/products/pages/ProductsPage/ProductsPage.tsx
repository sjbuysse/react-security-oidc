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
  const { url, path }: match = useRouteMatch();
  const { push } = useHistory();

  const goToCreateProduct = () => push(`${url}/create`);

  return (
      <Switch>
        <Route exact path={path}>
          <Page title="Products" onCreateButtonClick={goToCreateProduct}>
            <ProductsTable></ProductsTable>
          </Page>
        </Route>
        <Route path={`${path}/create`}>
          <Page title="Create product">
            <CreateProduct></CreateProduct>
          </Page>
        </Route>
        <Route path={`${path}/:productId/edit`}>
          <Page title="Edit product">
            <EditProduct></EditProduct>
          </Page>
        </Route>
      </Switch>
  );
}
