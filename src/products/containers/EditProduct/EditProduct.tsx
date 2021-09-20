import React, { useState, useEffect, useContext } from "react";
import { match, useRouteMatch, useHistory } from "react-router-dom";
import { Product, ProductForm } from "products";
import { FetchContext } from "../../../auth/contexts/FetchContext";

export function EditProduct() {
  const {
    params: { productId },
  }: match<{ productId: string }> = useRouteMatch();
  const { push } = useHistory();
  const authAxios = useContext(FetchContext);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const goBackToProducts = () => push("/products");
  const onEditProduct = async (productFields: Partial<Product>) => {
    await authAxios.put(`/products/${productId}`, productFields);
    goBackToProducts();
  };
  const retrieveProduct = async () => {
    const result = (await authAxios.get(`/products/${productId}`)).data;
    setProduct(result);
  };

  useEffect(() => {
    retrieveProduct();
    // eslint-disable-next-line
  }, []);

  return product ? (
      <ProductForm
          product={product}
          onSubmit={onEditProduct}
          onCancel={goBackToProducts}
      ></ProductForm>
  ) : null;
}
