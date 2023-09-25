import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../store/productSlice";
import Product from "./product";
import LoginForm from "../components/LoginForm/LoginForm";
// import Album from "../components/productList";
import PersistentDrawerRight from "../components/Body";
import CircularProgress from "@mui/material/CircularProgress";

const Auth = () => {
  const loginData = useSelector((state) => state.product.user);
  console.log(loginData);

  // const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {/* {isLoading && <CircularProgress setIsLoading={setIsLoading}  color="secondary" />} */}
      {loginData ? (
        <>
          <Product />
          <PersistentDrawerRight />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Auth;
