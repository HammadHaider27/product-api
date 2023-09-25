import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, useFormik } from "formik";
import { signInSchema } from "../../schemas";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../../api";
import { signInSuccess } from "../../store/productSlice";

const defaultTheme = createTheme();

const initialValues = {
  username: "kminchelle",
  password: "0lelplR",
};

export default function LoginForm({setIsLoading}) {
  const dispatch = useDispatch();

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signInSchema,

    onSubmit: (values, action) => {
      // setIsLoading(true)
       api
        .post("/auth/login", {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          if (res.status == "200") {
            console.log("login user data", res.data);
            dispatch(signInSuccess(res.data));
          } else {
            console.log("login error user data", res.data);
          }
        })
        .catch((err) => {
          console.log("login error catch", err);
        })
        // setIsLoading(false)

      console.log("values", values);
      action.resetForm();
    },
  });
  console.log("errors", errors);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="UserName"
              autoFocus
              type="text"
              autoComplete="off"
              name="username"
              id="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
