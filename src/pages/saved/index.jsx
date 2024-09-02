import { useEffect, useState } from "react";
import { getAll } from "../../services/apiService";
import ProductCard from "../../components/productCard";

import styles from "./styles.module.css";
import Header from "../../components/header";
import Loader from "../../components/loader";


export default function Saved() {
    const [products, setProducts] = useState([]);
    const [savedProducts, setSavedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getAll(1, 1000).then(res => {
            console.log(res);
            setProducts(res.data.products);
        }).finally(() =>
            setIsLoading(false)
        );
    }, []);

    useEffect(() => {
        if (products == null || products.length == 0) { return; }

        let savedItems = localStorage.getItem("@saved");
        if (savedItems == null || savedItems == "") {
            return;
        }
        let saved = JSON.parse(savedItems);
        if (saved == null || saved.length == 0) { return; }
        let s = [];
        for (let i = 0; i < products.length; i++) {
            if (saved.includes(products[i].id)) {
                s.push(products[i]);
            }
        }

        setSavedProducts(s);
    }, [products]);


    return (
        <div className={styles.container}>
            <Header></Header>
            {
                isLoading ? <Loader showLoader={isLoading}></Loader> :
                <>
                    {savedProducts.length > 0 ?
                    savedProducts.map(product => (
                    <ProductCard product={product}></ProductCard>
                    )) : <h1>Nenhum item salvo</h1>}
                </>

            }
        </div>
    );
}