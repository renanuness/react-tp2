import { useContext, useEffect } from "react";
import { getAll } from "../../services/apiService";
import { useState } from "react";
import ProductCard from "../../components/productCard";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../../App";
import Header from "../../components/header";
import Search from "../../components/search";
import Pagination from "../../components/pagination";
import Loader from "../../components/loader";

export default function Home() {
  const { notifySuccess, notifyError } = useContext(ApplicationContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [pages, setPages] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(function getProducts() {
    setLoading(true);
    getAll(currentPage, pageSize)
      .then((res) => {
        console.log(res);
        setProducts(res.data.products);

        setPages(Math.ceil(res.data.total / pageSize));
      })
      .catch((er) => {
        notifyError("Erro ao buscar produtos.")
        return { error: er, msg: "Erro ao buscar produtos na API." };
      }).finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  function addProduct() {
    navigate("/new-product");
  }

  function ShowProduct(product) {
    if (filter != "") {
      if (!product.title.toLowerCase().includes(filter.toLowerCase())) {
        return;
      }
    }
    return (
      <ProductCard key={product.id} product={product}></ProductCard>
    );
  }
  return (
    <div className={styles.container}>
      <Header></Header>
      <Loader showLoader={isLoading} />
      {!isLoading ? (
        <div className={styles.productList}>
          <Search setFilter={setFilter}></Search>
          <Pagination pages={pages} currentPage={currentPage} setCurrentPage={(v) => setCurrentPage(v)}></Pagination>
          {products.map((product) => (
            ShowProduct(product)
          ))}
          <button className={styles.addBtn} onClick={addProduct}>+</button>)
        </div>) : ""
      }
    </div>
  );
}
