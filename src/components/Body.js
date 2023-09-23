import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CardMedia from "@mui/material/CardMedia";
import Album from "./productList";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import CloseIcon from "@mui/icons-material/Close";
import { removeProduct } from "../store/productSlice";
import CustomizedBadges from "./Badge";
import ResponsiveAppBar from "./Navbar";

const drawerWidth = 320;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerRight() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const productDetail = useSelector((state) => state.product.cart);
  console.log("productDetail", productDetail);

  const totalAmount = (val) => {
    return val.count * val.price;
  };

  var FinaltotalAmount = 0;

  const cancelAddItem = (val) => {
    dispatch(removeProduct(val));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        {/* <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            The Shopping Feast
          </Typography> */}

        <ResponsiveAppBar />

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ ...(open && { display: "none" }) }}
        >
          <CustomizedBadges />
        </IconButton>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          <Album />
        </Typography>
      </Main>

      {/* ---------------------Side Bar----------------------- */}

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <h3>ADD TO CART</h3>
        </DrawerHeader>
        <Divider />
        {/* <BasicModal /> */}
        <List>
          {productDetail.map((val) => {
            FinaltotalAmount += totalAmount(val);
            return (
              <div className="cart-container">
                <CloseIcon
                  onClick={() => cancelAddItem(val)}
                  className="close-icon"
                />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <b>{val.title}</b>
                </Typography>
                <CardMedia
                  className="modal-image"
                  component="div"
                  sx={{
                    // 1:1
                    width: "100px",
                    height: "100px",
                  }}
                  image={val.image}
                />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Quantity: {val.count}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  1 x price: {val.price}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Total: {val.count} x {val.price} = {totalAmount(val)} $
                </Typography>
                <Divider />
              </div>
            );
          })}
          <List className="cart-container" position="fixed">
            <b>Total Amount:</b> {FinaltotalAmount} $
          </List>
        </List>
      </Drawer>
    </Box>
  );
}
