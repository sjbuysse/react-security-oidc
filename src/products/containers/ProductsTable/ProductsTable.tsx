import React, { useState, useEffect } from "react";
import { match, useRouteMatch, useHistory } from "react-router-dom";
import { Product, getProducts, deleteProduct } from "products";
import { Table } from "components";

export function ProductsTable() {
  const { url }: match = useRouteMatch();
  const { push } = useHistory();
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

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
  }, []);

  return (
    <Table
      headers={["Id", "Name", "Description", "Product Code"]}
      data={products}
      onEdit={(productId) => push(`${url}/${productId}/edit`)}
      onDelete={onDeleteProduct}
    ></Table>
  );
}
