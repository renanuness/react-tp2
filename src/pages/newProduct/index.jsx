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
  let mode = "";

  useEffect(() => {
    if (id) {
      mode = "edit";
      getById(id)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((er) => {
          // TODO: toast error
        });
    } else {
      mode = "add";
    }
  }, []);

  console.log("New Product: " + JSON.stringify(product));
  function save() {
    back();
    J;
  }

  function back() {
    navigate("/");
  }

  return (
    <>{product != null ? <ProductForm product={product}></ProductForm> : ""}</>
  );
}
