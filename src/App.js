import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { CartPage } from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductdetailsPage from "./pages/ProductdetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },

  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/productdetails",
    element: <ProductdetailsPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
