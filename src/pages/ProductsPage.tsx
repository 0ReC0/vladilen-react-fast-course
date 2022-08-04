import {useProducts} from "../hooks/products";
import React, {useContext} from "react";
import {ModalContext} from "../context/ModalContext";
import {IProduct} from "../models";
import {Loader} from "../components/Loader";
import {ErrorMessage} from "../components/ErrorMessage";
import {Product} from "../components/Product";
import {Modal} from "../components/Modal";
import {CreateProduct} from "../components/CreateProduct";

export function ProductsPage(){
    const {products, loading, error, addProduct} = useProducts();
    const {modal, open, close} = useContext(ModalContext)

    const createHandler = (product: IProduct) => {
        close();

        addProduct(product);
    };

    return (
        <div
            className="container mx-auto max-w-2xl pt-5"
        >
            {loading && <Loader />}
            {error && <ErrorMessage error={error} />}
            {products.map(product => <Product product={product} key={product.id} />)}
            {modal && <Modal
                onClose={close}
                title="Create new product "
            >
                <CreateProduct onCreate={createHandler} />
            </Modal>}

            <button
                onClick={open}
                className="px-4 py-2 fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl"
            >+
            </button>
        </div>
    );
}
