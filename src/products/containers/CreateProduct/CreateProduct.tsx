import React from "react";
import { useHistory } from "react-router-dom";
import { ProductForm, createProduct, Product } from "products";
import { Dialog } from '../../../components/Dialog/Dialog';

export function CreateProduct() {
  const { push } = useHistory();
  const goBackToProducts = () => push("/products");
  const onCreateProduct = async (newProduct: Partial<Product>) => {
    await createProduct(newProduct);
    goBackToProducts();
  };

  return (
      <Dialog show={true} title={'Create client'} onClose={goBackToProducts}>
          <ProductForm
              onSubmit={onCreateProduct}
              onCancel={goBackToProducts}
          ></ProductForm>
      </Dialog>
  );
}
