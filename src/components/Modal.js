import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";

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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const productDetail = useSelector((state) => state.product.cart);
  console.log("productDetail", productDetail);

  return (
    <div>
      {productDetail.map((val) => {
        const Total = val.count * val.price;
        return (
          <div>
            <Button onClick={handleOpen} className="icon">
              <ShoppingCartIcon />
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h3>ADD TO CART</h3>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {val.title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Quantity: {val.count}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  1 x price: {val.price}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Total: {val.count} x {val.price} = Rs. {Total}
                </Typography>
              </Box>
            </Modal>
          </div>
        );
      })}
      ;
    </div>
  );
}
