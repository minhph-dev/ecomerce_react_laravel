import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import swal from "sweetalert";
import styled from "styled-components";
import { mobile, tablet } from "../../../reponsive";

const Wrapper = styled.div`
  padding: 0 25%;
  ${tablet({ padding: "0 10% !important" })}
  ${mobile({ padding: "0 5% !important" })}
`;

const Header = styled(Typography)`
  ${tablet({ fontSize: "20px" })}
  ${mobile({ fontSize: "16px" })}
`;

export default function Profile() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [input, setInput] = useState({});

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);
    document.title = "My Profile";
    axios.get(`/api/profile`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setInput(res.data.myProfile);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("phone", input.phone);
    formData.append("pin_code", input.pin_code);
    formData.append("address", input.address);
    axios.post(`/api/profile`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setErrors([]);
      } else if (res.data.status === 422) {
        swal("All Fields are mandetory", "", "error");
        setErrors(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        navigate("/admin/view-product");
      }
    });
  };

  return (
    <Wrapper
      component="form"
      onSubmit={handleUpdate}
      encType="multipart/form-data"
    >
      <Header
        gutterBottom
        variant="h5"
        component="h1"
        className="fw-bold mb-4 d-flex justify-content-between mt-3"
      >
        <Box>
          <BoltIcon />
          Profile
        </Box>
        <Link to="/change-password" className="text-decoration-none">
          <Button variant="contained">Change Password ?</Button>
        </Link>
      </Header>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              id="outlined-required"
              label="User Name"
              name="name"
              value={input.name ?? " "}
              onChange={handleInput}
              focused
              size="small"
              helperText={errors.name}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              id="outlined-required"
              disabled
              name="email"
              value={input.email ?? " "}
              focused
              size="small"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              id="outlined-required"
              label="Phone Number"
              name="phone"
              value={input.phone ?? " "}
              onChange={handleInput}
              focused
              size="small"
              helperText={errors.phone}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              id="outlined-required"
              label="Zip/Pin Code"
              name="pin_code"
              value={input.pin_code ?? " "}
              onChange={handleInput}
              focused
              size="small"
              helperText={errors.pin_code}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="outlined-required"
              label="Address"
              name="address"
              value={input.address ?? " "}
              onChange={handleInput}
              multiline
              focused
              rows={4}
              size="small"
              helperText={errors.address}
            />
          </FormControl>
        </Grid>
        <Button type="submit" variant="contained" className="m-3">
          Save data
        </Button>
      </Grid>
    </Wrapper>
  );
}
