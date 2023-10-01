import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from "react-redux";
import { checkConfirmOrder } from "../../store/productSlice";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const confirmOrders = useSelector((state) => state.product.orders);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           {confirmOrders.products.map((product) => (
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
    </div>
  );
}