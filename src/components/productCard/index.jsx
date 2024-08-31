import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard(props) {
  const navigate = useNavigate();

  const product = props.product;

  function detail() {
    navigate("/product/" + product.id);
  }

  return (
    <div className={styles.card} onClick={detail}>
      <img src={product.images[0]} />
      <div className={styles.details}>
        <p>{product.title}</p>
        <p>{product.price}</p>
      </div>
    </div>
  );
}
