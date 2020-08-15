import React, { useState, useEffect } from "react";
import { match, useRouteMatch, useHistory } from "react-router-dom";
import { Product, getProduct, editProduct, ProductForm } from "products";
import { Dialog } from '../../../components/Dialog/Dialog';

export function EditProduct() {
    const {
        params: {productId},
    }: match<{ productId: string }> = useRouteMatch();
    const {push} = useHistory();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const goBackToProducts = () => push("/products");
    const onEditProduct = async (productFields: Partial<Product>) => {
        await editProduct({...product!, ...productFields});
        goBackToProducts();
    };
    const retrieveProduct = async () => {
        const result = await getProduct(productId);
        setProduct(result);
    };

    useEffect(() => {
        retrieveProduct();
        // eslint-disable-next-line
    }, []);

    return product ? (
        <Dialog show={true} title={'Edit product'} onClose={goBackToProducts}>
            <ProductForm
                product={product}
                onSubmit={onEditProduct}
                onCancel={goBackToProducts}
            ></ProductForm>
        </Dialog>

    ) : null;
}
