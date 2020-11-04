import React, { useState, useEffect } from "react";
import { match, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { Product, getProducts, deleteProduct } from "products";
import { Table } from "components";

export function ProductsTable() {
    const [products, setProducts] = useState<Product[] | undefined>(undefined);
    const {url}: match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => history.listen(() => retrieveProducts()), []);

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
            onEdit={(productid) => {
                history.push(`${url}/${productid}/edit`, {background: location})
            }}
            onDelete={onDeleteProduct}
        ></Table>
    );
}
