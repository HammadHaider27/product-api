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

    // api
    //   .post("/auth/login", {
    //     username: "kminchelle",
    //     password: "0lelplRa",
    //   })
    //   .then((res) => {
    //     if (res.status == "200") {
    //       console.log("login user data", res.data);
    //     } else {
    //       console.log("login error user data", res.data);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("login error catch", err);
    //   });
  }, []);

  return <div className=""></div>;
};

export default Product;
