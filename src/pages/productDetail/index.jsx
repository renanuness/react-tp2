import { useEffect, useState } from "react";
import { deleteById, getById } from "../../services/apiService";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./styles.module.css";

export default function ProductDetail(props) {
  const navigate = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(function getProduct() {
    getById(id)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      })
      .catch((er) => {
        // Toast;
      });
  }, []);

  function home() {
    navigate("/");
  }

  function edit() {
    navigate("../new-product/" + product.id);
  }

  function deleteProduct(){
    //TODO: Modal
    deleteById(product.id).then(
      res=>{
        //TODO: Toast e redirect
      }
    ).catch(error=>{
      // TODO: Toast
    });
  }

  return (
    <div className={styles.container}>
      <p className={styles.backBtn} onClick={home}>
        Voltar
      </p>
      {product?.images?.length > 0 ? (
        <img src={product.images[0]}></img>
      ) : (
        <img src="" />
      )}
      <div>
        <p>{product.title}</p>
        {product.brand ? <p>{product.brand} </p> : ""}
        <p>{product.description}</p>
        <p>R$ {product.price}</p>
        <p>Avaliação: {product.rating}</p>
        <div className={styles.buttonsContainer}>
          <button className={styles.editBtn} onClick={edit}>
            Editar
          </button>
          <button className={styles.deleteBtn} onClick={deleteProduct}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
