import "../App.css";
import { useEffect, useState } from "react";
import { api } from "../api";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../store/productSlice";

const Product = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        // console.log("response", res);
        if (res.status == "200") {
          dispatch(addProduct(res.data.products));
          // console.log("response data", res.data.products);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
      
  }, []);

  return <div className=""></div>;
};

export default Product;
