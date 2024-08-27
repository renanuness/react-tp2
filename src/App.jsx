import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import ProductDetail from "./pages/productDetail";
import NewProduct from "./pages/newProduct";

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

export default function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}
