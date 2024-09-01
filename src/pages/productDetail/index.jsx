import { useContext, useEffect, useState } from "react";
import { deleteById, getById } from "../../services/apiService";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./styles.module.css";
import { ApplicationContext } from "../../App";
import MyModal from "../../components/modal";
import Header from "../../components/header";
import SaveProduct from "../../components/saveProduct";


export default function ProductDetail(props) {
  const { notifyError, notifySuccess } = useContext(ApplicationContext);
  const navigate = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

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

  function deleteProduct() {
    deleteById(product.id).then(
      res => {
        notifySuccess("Produto excluído com sucesso");
        navigate("/");
      }
    ).catch(error => {
      notifyError("Erro");

    });
  }

  return (
    <div>
      <Header />

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
          <p>{product?.title}</p>
          {product?.brand ? <p>{product.brand} </p> : ""}
          <p>{product?.description}</p>
          <p>R$ {product?.price}</p>
          <p>Avaliação: {product?.rating}</p>
          { product ? <SaveProduct product={product}></SaveProduct> : ""}
          <div className={styles.buttonsContainer}>
            <button className={styles.editBtn} onClick={edit}>
              Editar
            </button>
            <button className={styles.deleteBtn} onClick={() => setIsOpen(true)} >
              Excluir
            </button>
          </div>
        </div>
        <MyModal openModal={modalIsOpen} onConfirm={deleteProduct} onCancel={() => setIsOpen(false)}></MyModal>
      </div>
    </div>

  );
}
