import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct,removeProduct } from "../store/productSlice";
import Product from "./product"
import Album from "../components/productList"

const Auth = () => {


  return (
    <div>
        <Product />
        <Album />
    </div>
  );
};

export default Auth;
