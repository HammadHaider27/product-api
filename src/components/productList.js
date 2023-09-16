import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import { addToCart } from "../store/productSlice";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Swal from "sweetalert2";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Album() {
  const productData = useSelector((state) => state.product);
  console.log("productData", productData);

  const dispatch = useDispatch();

  const [count, setCount] = useState(0);

  const handleClickAdd = () => {
    setCount(count + 1);
  };
  const handleClickSub = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const addToStore = (value) => {
    {
      count == 0
        ? Swal.fire({
            imageUrl: "https://i.imgflip.com/3rm5rv.png?a470736",
            imageHeight: 200,
            imageAlt: "A tall image",
            title: "Oops...",
            text: "Please Insert The Quantity First!",
          })
        : dispatch(
            addToCart({
              id: value.id,
              title: value.title,
              price: value.price,
              count: count,
              image: value.images[0],
            })
          );

      setCount(0);
    }
    console.log("value id", value.id);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              The Shopping Feast
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {productData.product.map((value, index) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image={value.images[0]}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {value.title}
                      </Typography>
                      <Typography>
                        <i>{value.description}</i>
                      </Typography>{" "}
                      <br />
                      <Typography>
                        <b>Price:</b> {value.price}
                      </Typography>
                      <Typography>
                        <b>Brand:</b> {value.brand}
                      </Typography>
                      <Typography>
                        <div>
                          Quantity:
                          <span className="quantity">
                            <RemoveIcon
                              onClick={handleClickSub}
                              className="icon1"
                            />
                            {/* ---------------------------Count Value----------------------------------- */}
                            {count}
                            <AddIcon
                              onClick={handleClickAdd}
                              className="icon1"
                            />
                          </span>
                        </div>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => addToStore(value)}>
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
