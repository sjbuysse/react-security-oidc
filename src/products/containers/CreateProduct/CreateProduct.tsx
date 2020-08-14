import React from "react";
import { useHistory } from "react-router-dom";
import { ProductForm, addProduct, Product } from "products";

export function CreateProduct() {
  const { push } = useHistory();
  const goBackToProducts = () => push("/products");
  const onCreateProduct = async (newProduct: Partial<Product>) => {
    await addProduct(newProduct);
    goBackToProducts();
  };

  return (
      <ProductForm
          onSubmit={onCreateProduct}
          onCancel={goBackToProducts}
      ></ProductForm>
  );
}
