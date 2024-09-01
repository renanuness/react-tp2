import { useEffect, useState } from "react";
import { getAll } from "../../services/apiService";
import ProductCard from "../../components/productCard";

import styles from "./styles.module.css";
import Header from "../../components/header";


export default function Saved() {
    const [products, setProducts] = useState([]);
    const [savedProducts, setSavedProducts] = useState([]);


    useEffect(()=>{
        getAll(1, 1000).then(res => {
            console.log(res);
            setProducts(res.data.products);
        })
    }, []);

    useEffect(() => {
        if(products == null || products.length == 0){return;}
        let saved = JSON.parse(localStorage.getItem("@saved"));
        if(saved == null || saved.length == 0){return;}
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
            savedProducts.map(product => (
                <ProductCard product={product}></ProductCard>
            ))
        }
        </div>
    );
}