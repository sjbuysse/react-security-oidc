import { Product } from "products/types";

const apiUrl = "http://localhost:8080/products";

export const getProduct = async (id: string): Promise<Product> =>
    (await fetch(`${apiUrl}/${id}`)).json();

export const getProducts = async (): Promise<Product[]> =>
    (await fetch(apiUrl)).json();

export const createProduct = async (
    product: Partial<Product>
): Promise<Product> =>
    (
        await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
    ).json();

export const editProduct = async (product: Product): Promise<Product> =>
    (
        await fetch(`${apiUrl}/${product.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
    ).json();

export const deleteProduct = async (id: string): Promise<any> => {
    return await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
    });
};
