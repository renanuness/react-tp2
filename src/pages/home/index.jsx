import { useContext, useEffect } from "react";
import { getAll } from "../../services/apiService";
import { useState } from "react";
import ProductCard from "../../components/productCard";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../../App";
import Header from "../../components/header";

export default function Home() {
  const {notifySuccess, notifyError} = useContext(ApplicationContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(function getProducts() {
    getAll()
      .then((res) => {
        console.log(res);
        setProducts(res.data.products);
      })
      .catch((er) => {
        notifyError("Erro ao buscar produtos.")
        return { error: er, msg: "Erro ao buscar produtos na API." };
      });
  }, []);

  function addProduct() {
    navigate("/new-product");
  }

  return (
    <div className={styles.container}>
      <Header></Header>
      {products.map((product) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))}
      <button onClick={addProduct}>+</button>
    </div>
  );
}
