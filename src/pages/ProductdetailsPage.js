import React from "react";
import ProductDetails from "../features/products-list/ProductDetails";
import Navbar from "../features/navbar/Navbar";

const ProductdetailsPage = () => {
  return (
    <div>
      <Navbar>
        <ProductDetails />
      </Navbar>
    </div>
  );
};

export default ProductdetailsPage;
