import axios from "axios";

export function getAll(currentPage, pageSize) {
  return axios.get("https://dummyjson.com/products?limit="+pageSize+"&skip="+(currentPage-1)*pageSize);
}

export function getById(id) {
  return axios.get("https://dummyjson.com/products/" + id);
}

export function deleteById(id){
  return axios.delete("https://dummyjson.com/products/" + id);
}