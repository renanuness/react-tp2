import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import * as yup from "yup";
import { useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

const schema = yup
  .object({
    title: yup.string().required("Título é obrigatório"),
    brand: yup.string(),
    description: yup.string().required("Descrição é obrigatória"),
    price: yup.number().positive().integer().required("Preço é obrigatório"),
  })
  .required();

export default function ProductForm(props) {
  console.log("Form props: " + JSON.stringify(props.product));
  const navigate = useNavigate();
  const [product, setProduct] = useState(props.product);
  let { id } = useParams();
  let mode = "";

  console.log(product);
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
    console.log("FORM:" + JSON.stringify(product));
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
      <Input control={control} name="title" rules={{ required: true }} />
      <input placeholder="Título" {...register("title")} />
      <input
        value={product.brand}
        onChange={(e) => {
          console.log(e);
          let p = { ...product };
          p.brand = e.target.value;
          setProduct(p);
        }}
        placeholder="Marca"
        {...register("brand")}
      />
      <input placeholder="Descrição" {...register("description")} />
      <input value={product.price} placeholder="Preço" {...register("price")} />
      <div>
        <button onClick={props.back}>Cancelar</button>
        <button>Salvar</button>
      </div>
    </form>
  );
}

function Input(props) {
  const { field, fieldState } = useController(props);

  return (
    <div>
      <input {...field} placeholder={props.name} />
      <p>{fieldState.isTouched && "Touched"}</p>
      <p>{fieldState.isDirty && "Dirty"}</p>
      <p>{fieldState.invalid ? "invalid" : "valid"}</p>
    </div>
  );
}
