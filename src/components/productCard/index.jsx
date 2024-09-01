import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard(props) {
  const navigate = useNavigate();
  const [saveButtonStyle, setButtonStyle] = useState("");
  const product = props.product;
  const savedStyle = `${styles.saved}`;

  function detail() {
    navigate("/product/" + product.id);
  }

  useEffect(() => {
    if (isSaved()) {
      setButtonStyle(savedStyle);
    }
  }, []);

  function isSaved() {
    let saved = JSON.parse(localStorage.getItem("@saved"));

    if (saved && saved.length > 0) {
      if (saved.includes(product.id)) {
        return true;
      }
    }

    return false;
  }

  function save() {
    if (isSaved()) {
      removeSave();
    } else {
      let saved = JSON.parse(localStorage.getItem("@saved"));
      if (saved == null) {
        saved = [];
      }
      saved.push(product.id);
      localStorage.setItem("@saved", JSON.stringify(saved));
      setButtonStyle(savedStyle);
    }
  }

  function removeSave() {
    let saved = JSON.parse(localStorage.getItem("@saved"));
    let news = saved.filter(p => p != product.id);
    localStorage.setItem("@saved", JSON.stringify(news));
    setButtonStyle("");
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
      <button onClick={save} className={saveButtonStyle}>Favoritar</button>
    </div>
  );
}
