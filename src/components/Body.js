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
import { Button } from "@mui/material";
import Album from "./productList";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import CloseIcon from "@mui/icons-material/Close";
import { confirmOrder, removeProduct } from "../store/productSlice";
import ResponsiveAppBar from "./Navbar";
import { api } from "../api";
import checkOrder from "./CheckConfirmOrders/CheckConfirmOrders";
import Link from "@mui/material/Link";
import { useNavigate, useNavigation } from "react-router-dom";

const drawerWidth = 320;
const leftDrawerWidth = 220;

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

  const navigate = useNavigate();
  const productDetail = useSelector((state) => state.product.cart);
  const userDetail = useSelector((state) => state.product.user);
  console.log("productDetail", productDetail);
  console.log("userDetail", userDetail);

  const totalAmount = (val) => {
    return val.count * val.price;
  };

  var FinaltotalAmount = 0;

  const cancelAddItem = (val) => {
    dispatch(removeProduct(val));
  };

  // const checkConfirmOrder = () => {
  //   useEffect(() => {
  //     api
  //       .get("/carts/user/" + userDetail.id)
  //       .then((res) => {
  //         // console.log("response", res);
  //         if (res.status == "200") {
  //           dispatch(addProduct(res.data));
  //           // console.log("response data", res.data);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("err", err);
  //       });
  //   }, []);

  //     <checkConfirmOrder />
  // }

  // -------------------------------------Carts Api Fetching ---------------------------------

  const confirmedOrder = () => {
    const modifiedProducts = productDetail.map((product) => ({
      id: product.id,
      quantity: product.count,
    }));

    api
      .post("/carts/add", {
        userId: userDetail.id,
        products: modifiedProducts,
      })
      .then((response) => {
        console.log("response", response);
        if (response.status == "200") {
          dispatch(confirmOrder(response.data));
          console.log("response data", response.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ width: `${leftDrawerWidth}px)`, ml: `${leftDrawerWidth}px` }}
      >
        <ResponsiveAppBar
          open={open}
          setOpen={setOpen}
          handleDrawerOpen={handleDrawerOpen}
        />
      </AppBar>

      {/* ---------------------------------Left SideDrawer----------------------------------- */}
      <Drawer
        sx={{
          width: leftDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: leftDrawerWidth,
            boxSizing: "border-box",
            marginTop: "70px",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* ---------------------------------CheckConfirmOrders----------------------------------- */}

        <Button
          onClick={() => navigate("/CheckConfirmOrders")}
          variant="outlined"
        >
          My orders 
        </Button>

        <Divider />
        <Toolbar />
        <List></List>
      </Drawer>
      {/* --------------------------------------End--- ------------------------------------- */}
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          <Album />
        </Typography>
      </Main>

      {/* -------------------------------------Side Bar Right----------------------------------- */}

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
          <List className="order-btn" position="fixed">
            <Button
              onClick={() => confirmedOrder()}
              variant="contained"
              size="large"
            >
              confirm order
            </Button>
          </List>
        </List>
      </Drawer>
    </Box>
  );
}
