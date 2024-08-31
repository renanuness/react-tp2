import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import * as yup from "yup";
import { useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { getById } from "../../services/apiService";
import ProductForm from "../../components/productForm";
import axios from "axios";
import { ApplicationContext } from "../../App";
import Header from "../../components/header";

export default function NewProduct() {
  const {notifySuccess, notifyError, user} = useContext(ApplicationContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  let { id } = useParams();
  const [mode, setMode] = useState("add");

  useEffect(() => {
    if (id) {
      setMode("edit");
      getById(id)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((er) => {
          notifyError("Erro ao buscar produto")
        });
    }
  }, []);

  function save(data) {
    axios.post('https://dummyjson.com/products/add', {body:{data}})
    .then(res=>{
      notifySuccess("Produto criado com sucesso");
    }).catch(error=>{
      notifyError("Erro ao criar produto");
    });
    back();
  }

  function back() {
    navigate("/");
  }

  return (
    <>
      <Header/>
    {
      mode == "edit" && product != null ? 
        <ProductForm back={back}  mode={mode} save={(data)=>save(data)} product={product}></ProductForm> : 
        mode == 'add' ? 
        <ProductForm  mode={mode} back={back} save={(data)=>save(data)}></ProductForm> : ""
    }
    </>
  );
}
