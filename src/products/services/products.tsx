import { Product } from "products/types";

const apiUrl = "http://localhost:8080/products/";

export const getProducts = async () => {
    const response = await fetch(apiUrl);

    return response.json();
};

export const getProduct = async (id: string) => {
    const response = await fetch(`${apiUrl}{id}`);

    return response.json();
};

export const addProduct = async (
    product: Partial<Product> = {}
): Promise<Product[]> => {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    return response.json();
};

export const editProduct = async (product: Product): Promise<Product[]> => {
    const response = await fetch(`${apiUrl}${product.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    return response.json();
};

export const deleteProduct = async (productId: string): Promise<{}> => {
    await fetch(`${apiUrl}${productId}`, {
        method: "DELETE",
    });

    return {};
};
