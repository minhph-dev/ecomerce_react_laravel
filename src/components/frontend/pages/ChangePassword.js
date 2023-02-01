import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import styled from "styled-components";
import { mobile, tablet } from "../../../reponsive";
import { useEffect } from "react";

const Wrapper = styled.div`
  padding: 0 25%;
  ${tablet({ padding: "0 10% !important" })}
  ${mobile({ padding: "0 5% !important" })}
`;

const Header = styled(Typography)`
  ${tablet({ fontSize: "20px" })}
  ${mobile({ fontSize: "16px" })}
`;

export default function ChangePassword() {
  const [errors, setErrors] = useState([]);
  const [input, setInput] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);
    if (isMounted) {
      document.title = "Change Password";
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("current_password", input.current_password);
    formData.append("password", input.password);
    formData.append("password_confirmation", input.password_confirmation);
    axios.post(`/api/change-password`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setErrors([]);
      } else if (res.data.status === 422) {
        swal("All Fields are mandetory", "", "error");
        setErrors(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
      }
    });
  };
  return (
    <Wrapper
      component="form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <Header
        gutterBottom
        variant="h5"
        component="h1"
        className="fw-bold mb-4 d-flex justify-content-between align-items-center mt-3"
      >
        <Box>
          <BoltIcon />
          Change Password
        </Box>
        <Link to="/profile">
          <Button variant="contained">Back</Button>
        </Link>
      </Header>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Current Password"
              name="current_password"
              value={input.current_password}
              type={"password"}
              id="outlined-adornment-password"
              onChange={handleInput}
              focused
              size="small"
              helperText={errors.current_password}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} className="my-3">
          <FormControl fullWidth>
            <TextField
              label="New Password"
              name="password"
              value={input.password}
              type={"password"}
              id="outlined-adornment-password"
              onChange={handleInput}
              focused
              size="small"
              helperText={errors.password}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} className="my-3">
          <FormControl fullWidth>
            <TextField
              label="Confirm Password"
              name="password_confirmation"
              value={input.password_confirmation}
              type={"password"}
              id="outlined-adornment-password"
              onChange={handleInput}
              focused
              size="small"
              helperText={errors.password_confirmation}
            />
          </FormControl>
        </Grid>

        <Button type="submit" variant="contained" className="m-3">
          Update Password
        </Button>
      </Grid>
    </Wrapper>
  );
}
