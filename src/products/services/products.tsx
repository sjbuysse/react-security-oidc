import { Product } from "products/models";
import axios, { AxiosInstance } from "axios";

const apiUrl = "https://base-app-backend.herokuapp.com";
export const getProduct = async (
  authAxios: AxiosInstance,
  id: string
): Promise<Product> => (await authAxios.get(`/products/${id}`)).data;

export const getProducts = async (
  authAxios: AxiosInstance
): Promise<Product[]> => (await authAxios.get("/products")).data;

export const createProduct = async (
  product: Partial<Product>
): Promise<Product> => (await axios.post(apiUrl, product)).data;

export const editProduct = async (product: Product): Promise<Product> =>
  (await axios.put(`${apiUrl}/${product.id}`, product)).data;

export const deleteProduct = async (id: string): Promise<any> => {
  return await axios.delete(`${apiUrl}/${id}`);
};
