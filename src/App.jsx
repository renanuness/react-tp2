import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import ProductDetail from "./pages/productDetail";
import NewProduct from "./pages/newProduct";
import { toast, ToastContainer } from "react-toastify";
import React from "react";

import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "product/:id",
    element: <ProductDetail></ProductDetail>,
  },
  {
    path: "new-product",
    element: <NewProduct></NewProduct>,
  },
  {
    path: "new-product/:id",
    element: <NewProduct></NewProduct>,
  },
]);

export const ToastContext = React.createContext(null);

export default function App() {
  const notifyError = (msg)=> toast(msg, {
    type: "error"
  });

  const notifySuccess = (msg)=> toast(msg, {
    type: "success"
  });

  return (
    <main>
      <ToastContext.Provider value={{notifyError:notifyError, notifySuccess}}>
        <RouterProvider router={router} />
        <ToastContainer ></ToastContainer>
      </ToastContext.Provider>
    </main>
  );
}
