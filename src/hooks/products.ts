import {useEffect, useState} from "react";
import {IProduct} from "../models";
import axios, {AxiosError} from "axios";

export function useProducts() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    function addProduct(product: IProduct) {
        setProducts(prev => [...prev, product]);
    }

    async function fetchProducts() {
        try {
            setError('');
            setLoading(true);

            const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products?limit=5');
            setProducts(response.data);
        } catch (e: unknown) {
            const error = e as AxiosError;
            setError(error.message);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return {products, error, loading, addProduct};
}
