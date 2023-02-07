import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../../../context/AuthProvider";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const { setLogged } = useContext(AuthContext);
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });
  const auth = getAuth();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      window.scrollTo(0, 0);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const { user } = await signInWithPopup(auth, provider);
  };

  const handleInput = (e) => {
    e.persist();
    setLogin({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          sessionStorage.setItem("auth_token", res.data.token);
          sessionStorage.setItem("auth_name", res.data.username);
          setLogged(true);
          swal("Success", res.data.message, "success");
          if (res.data.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        } else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        } else {
          setLogin({
            ...loginInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };
  const theme = createTheme();
  if (sessionStorage.getItem("auth_token")) {
    return <Navigate to="/" />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
            }}
          >
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
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleInput}
              autoComplete="email"
              value={loginInput.email}
              autoFocus
              helperText={loginInput.error_list.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={handleInput}
              value={loginInput.password}
              label="Password"
              type={"password"}
              id="outlined-adornment-password"
              autoComplete="current-password"
              helperText={loginInput.error_list.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  onClick={handleLoginWithGoogle}
                  className="w-100 mb-2"
                >
                  Login with Google
                </Button>
              </Grid>
              <Grid item xs={12} className="text-end">
                <Link to="/register" variant="body2">
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

export default Login;
