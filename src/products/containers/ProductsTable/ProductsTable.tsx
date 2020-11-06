import React, { useState, useEffect } from "react";
import {
  match,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { ProductRow, Product, getProducts, deleteProduct } from "products";
import {
  ActionButtonType,
  ActionButton,
  ActionButtonMenu,
  Table,
} from "components";
import { useSelector } from "react-redux";
import { selectIsReadOnly } from "../../../state/selectors";

export function ProductsTable() {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const { url }: match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const isReadOnly = useSelector(selectIsReadOnly);

  useEffect(() => history.listen(() => retrieveProducts()), [history]);

  const retrieveProducts = async () => {
    const result = await getProducts();
    setProducts(result);
  };

  const onDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      await deleteProduct(id);
      retrieveProducts();
    }
  };

  useEffect(() => {
    retrieveProducts();
  }, [history]);

  return (
    <Table
      headers={["Id", "Name", "Description", "Product Code"]}
      data={products}
      renderRow={(product) => (
        <ProductRow key={product.id} product={product}>
          <ActionButtonMenu disabled={isReadOnly}>
            <ActionButton
              className="mr-4"
              type={ActionButtonType.EDIT}
              label="Edit"
              onClick={() =>
                history.push(`${url}/${product.id}/edit`, {
                  background: location,
                })
              }
            />
            <ActionButton
              type={ActionButtonType.DELETE}
              label="Delete"
              onClick={() => onDeleteProduct(product.id)}
            />
          </ActionButtonMenu>
        </ProductRow>
      )}
    ></Table>
  );
}
