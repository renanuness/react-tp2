import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import SaveProduct from "../saveProduct";

export default function ProductCard(props) {
  const navigate = useNavigate();
  const [saveButtonStyle, setButtonStyle] = useState("");
  const product = props.product;
  const savedStyle = `${styles.saved}`;

  function detail() {
    navigate("/product/" + product.id);
  }

  return (
    <div className={styles.container}>
      <div className={styles.card} onClick={detail}>
        <img src={product.images[0]} />
        <div className={styles.details}>
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>
      </div>
      <SaveProduct product={product}></SaveProduct>
    </div>
  );
}
