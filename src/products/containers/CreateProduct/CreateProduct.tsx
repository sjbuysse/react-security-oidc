import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProductForm, createProduct, Product } from "products";
import axios from "axios";
import { FetchContext } from "../../../auth/context/FetchContext";

export function CreateProduct() {
  const { push } = useHistory();
  const authAxtions = useContext(FetchContext);
  const goBackToProducts = () => push("/products");
  const onCreateProduct = async (newProduct: Partial<Product>) => {
    await authAxtions.post("/products", newProduct);
    goBackToProducts();
  };

  return (
    <ProductForm
      onSubmit={onCreateProduct}
      onCancel={goBackToProducts}
    ></ProductForm>
  );
}
