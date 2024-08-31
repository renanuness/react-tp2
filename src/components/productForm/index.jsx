import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import FormInput from "../formInput";

const schema = yup
  .object({
    title: yup.string().required("Título é obrigatório"),
    brand: yup.string(),
    description: yup.string().required("Descrição é obrigatória"),
    price: yup.number("O preço precisa ser um valor numérico").positive("Preço precisa ser positivo").required("Preço é obrigatório"),
  })
  .required();

export default function ProductForm(props) {
  const [product, setProduct] = useState(props.product);
  let { id } = useParams();
  let mode = "";

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...product },
    mode: "onChange",
  });

  useEffect(() => {
    reset(product);
    console.log(product);
  }, [product]);

  const onSubmit = (data) => {
    //TODO: Add toast
    props.save(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1>{props.mode == "add" ? "Adicionar Produto" : "Editar Produto"}</h1>
      <FormInput control={control} placeholder={"Título"} name="title" rules={{ required: true }} />
      <FormInput control={control} placeholder={"Marca"} name="brand" rules={{}} />
      <FormInput control={control} placeholder={"Descrição"} name="description" rules={{ required: true }} />
      <FormInput control={control} placeholder={"Preço"} name="price" rules={{ required: true }} />

      <div>
        <button onClick={props.back}>Cancelar</button>
        <input type="submit" value="Salvar" />
      </div>
    </form>
  );
}

