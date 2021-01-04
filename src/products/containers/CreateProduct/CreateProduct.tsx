import React from "react";
import { useHistory } from "react-router-dom";
import { ProductForm, createProduct, Product } from "products";

export function CreateProduct() {
  const { push } = useHistory();
  const goBackToProducts = () => push("/products");
  const onCreateProduct = async (newProduct: Partial<Product>) => {
    await createProduct(newProduct);
    goBackToProducts();
  };

  return (
    <ProductForm
      onSubmit={onCreateProduct}
      onCancel={goBackToProducts}
    ></ProductForm>
  );
}
