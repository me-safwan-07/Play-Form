export interface Product {
    _id: string;
    name: string;
    price: number;
    formId: string;
}

export interface ProductResponse {
    products: Product[];
}


import API from "./axiosInstance";
// import { Product, ProductResponse } from "../types/productTypes";

export const getProducts = async (formId: string): Promise<Product[]> => {
    const response = await API.get<ProductResponse>(`/forms/${formId}/products`);
    return response.data.products;
};

export const createProduct = async (formId: string, productData: Partial<Product>): Promise<Product> => {
    const response = await API.post<Product>(`/forms/${formId}/products`, productData);
    return response.data;
};

export const updateProduct = async (productId: string, productData: Partial<Product>): Promise<Product> => {
    const response = await API.put<Product>(`/products/${productId}`, productData);
    return response.data;
};

export const deleteProduct = async (productId: string): Promise<void> => {
    await API.delete(`/products/${productId}`);
};
