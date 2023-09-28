import React from "react";
import { api } from "../../api";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import checkConfirmOrder from "../../store/productSlice";

const CheckConfirmOrders = () => {
  const userDetail = useSelector((state) => state.product.user);
  const confirmOrders = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get("/carts/user/" + userDetail.id)
      .then((res) => {
        console.log("getresponse", res);
        if (res.status == "200") {
          dispatch(checkConfirmOrder(res.data.carts));
          console.log("response data", res.data.carts);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    <div>
      <p>hello world</p>
      {confirmOrders.orders.map((val)=>{
        return(
            <div>
                 {val.id}
            </div>
        )
      })}
      <p>hello world</p>
    </div>
  );
};

export default CheckConfirmOrders;
