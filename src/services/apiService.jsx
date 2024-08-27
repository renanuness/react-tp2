import axios from "axios";

export function getAll() {
  return axios.get("https://dummyjson.com/products");
}

export function getById(id) {
  return axios.get("https://dummyjson.com/products/" + id);
}
