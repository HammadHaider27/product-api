import React from "react";
import { api } from "../../api";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkConfirmOrder } from "../../store/productSlice";
import { Button, Modal, Box } from "@mui/material";
import "./style.css";
import BasicModal from "./Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CheckOrders = () => {
  const userDetail = useSelector((state) => state.product.user);
  const confirmOrders = useSelector((state) => state.product.orders);
  console.log("confirmOrders", confirmOrders);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get("/carts/user/" + userDetail.id)
      .then((res) => {
        console.log("getresponse", res);
        if (res.status == "200") {
          dispatch(checkConfirmOrder(res.data.carts));
          console.log("response product data", res.data.carts);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    <div>
      <h1>Confirm Orders</h1>
      {confirmOrders.map((val) => {
        console.log("confirmOrders val", val);
        return (
          <div>
            <p>
              {" "}
              <b>Total Products:</b> {val.totalProducts}
            </p>{" "}
            <p>
              {" "}
              <b>Total Quantity:</b> {val.totalQuantity}
            </p>
            <p>
              {" "}
              <b>Total Amount:</b> {val.total}
            </p>
            <p>
              {" "}
              <b>Total Discount:</b> {val.discountedTotal}
            </p>
            <Button onClick={handleOpen} variant="contained">
              view items
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {val.products.map((product) => (
                  <div key={product.id}>
                    <p>
                      {" "}
                      <b>Title:</b> {product.title}
                    </p>
                    <p>
                      {" "}
                      <b>Quantity:</b> {product.quantity}
                    </p>
                    <p>
                      {" "}
                      <b>Total:</b> {product.total}
                    </p>
                    <br />
                  </div>
                ))}
              </Box>
            </Modal>
            <hr />
            <center>
              <h3>Thank you for your order! </h3>
              <p>
                We appreciate your business and hope you enjoy your products.
              </p>
            </center>
          </div>
        );
      })}
    </div>
  );
};

export default CheckOrders;
