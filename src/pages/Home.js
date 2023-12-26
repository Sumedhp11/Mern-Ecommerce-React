import React from "react";
import Navbar from "../features/navbar/Navbar";
import Productlist from "../features/products-list/Productlist";

const Home = () => {
  return (
    <div>
      <Navbar>
        <Productlist />
      </Navbar>
    </div>
  );
};

export default Home;
