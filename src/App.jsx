import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import Login from "./pages/login";
import Home from "./pages/home";
import ProductDetail from "./pages/productDetail";
import NewProduct from "./pages/newProduct";

import "./App.css";

import 'react-toastify/dist/ReactToastify.css';
import  { getUserLogged } from "./services/userLogged";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/home",
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

export const ApplicationContext = React.createContext(null);

export default function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  let styleClass = `${theme} container`;

  const notifyError = (msg) => toast(msg, {
    type: "error"
  });

  const notifySuccess = (msg) => toast(msg, {
    type: "success"
  });

  function setUserLogged(user) {
    setUser(user);
  }

  useEffect(()=>{
    let currentTheme = localStorage.getItem("@theme");
    if(currentTheme){
      setTheme(currentTheme);
    }
  },[]);

  function changeTheme() {
    if (theme == "light") {
      localStorage.setItem("@theme","dark");
      setTheme("dark");
    } else {
      setTheme("light");
      localStorage.setItem("@theme","light");
    }
  }
  return (
    <main className={styleClass}>
      <ApplicationContext.Provider value={{ notifyError, notifySuccess, user, setUserLogged, changeTheme }}>
        <RouterProvider router={router} />
        <ToastContainer ></ToastContainer>
      </ApplicationContext.Provider>
    </main>
  );
}
