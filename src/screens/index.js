import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct,removeProduct } from "../store/productSlice";
import Product from "./product";
// import Album from "../components/productList";
import PersistentDrawerRight from "../components/Body";

const Auth = () => {

  return (
    <div>
        <Product />
        <PersistentDrawerRight />
    </div>
  );
};

export default Auth;
