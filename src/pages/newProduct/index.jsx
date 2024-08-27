import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import * as yup from "yup";
import { useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { getById } from "../../services/apiService";
import ProductForm from "../../components/productForm";

export default function NewProduct() {
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
          // TODO: toast error
        });
    }
  }, []);

  function save(data) {
    // TODO: Toast
    back();
  }

  function deleteProduct(){
    //TODO: Toast
  }

  function back() {
    navigate("/");
  }

  return (
    <>{
      mode == "edit" && product != null ? 
        <ProductForm back={back}  mode={mode} save={(data)=>save(data)} product={product}></ProductForm> : 
        mode == 'add' ? 
        <ProductForm  mode={mode} back={back} save={(data)=>save(data)}></ProductForm> : ""
    }
    </>
  );
}
