import { useEffect, useState } from "react";

import styles from './styles.module.css';

export default function SaveProduct(props){
  const product = props.product;
  const [saveButtonStyle, setButtonStyle] = useState("");
  const savedStyle = `${styles.saved}`;

  useEffect(() => {
    if (isSaved()) {
      setButtonStyle(savedStyle);
    }
  }, []);

  function isSaved() {
    let savedValues = localStorage.getItem("@saved");
    if(savedValues == null || savedValues == ""){
      return false;
    }
    let saved = JSON.parse(savedValues);

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
      let saved = localStorage.getItem("@saved");
      if(saved == null || saved == ""){
        saved = [];
      }else{
        saved = JSON.parse(localStorage.getItem("@saved"));
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
      <button onClick={save} className={saveButtonStyle}>Favoritar</button>

    );
}