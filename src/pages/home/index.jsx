import { useEffect } from "react";
import { getAll } from "../../services/apiService";
import { useState } from "react";
import ProductCard from "../../components/productCard";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(function getProducts() {
    getAll()
      .then((res) => {
        console.log(res);
        setProducts(res.data.products);
      })
      .catch((er) => {
        //TODO: Toast
        return { error: er, msg: "Erro ao buscar produtos na API." };
      });
  }, []);

  function addProduct() {
    navigate("new-product");
  }

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))}
      <button onClick={addProduct}>+</button>
    </div>
  );
}
