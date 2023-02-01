import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  FormControl,
  Button,
} from "@mui/material";

function AddUser() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role_as: "",
    error_list: [],
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      document.title = "Add User";
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
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role_as", input.role_as);

    axios.post(`api/admin/store-user`, formData).then((res) => {
      if (res.data.status === 200) {
        e.target.reset();
        setInput({
          ...input,
          name: "",
          email: "",
          password: "",
          role_as: "",
          error_list: [],
        });
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 400) {
        setInput({ ...input, error_list: res.data.errors });
      }
    });
  };

  return (
    <Box className="card m-sm-0 m-md-5">
      <Box className="card-header">
        <h4>
          Add User
          <Link
            to="/admin/view-user"
            className="btn btn-primary btn-sm float-end"
          >
            View User
          </Link>
        </h4>
      </Box>
      <Box className="card-body" component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="outlined-required"
                label="Name"
                name="name"
                onChange={handleInput}
                value={input.name}
                helperText={input.error_list.name}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="outlined-required"
                label="Email"
                name="email"
                onChange={handleInput}
                value={input.email}
                helperText={input.error_list.email}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="outlined-required"
                label="Password"
                name="password"
                onChange={handleInput}
                value={input.password}
                helperText={input.error_list.password}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="role_as"
                value={input.role_as}
                onChange={handleInput}
                label="Choose Role"
              >
                <MenuItem value="1">Admin</MenuItem>
                <MenuItem value="0">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          type="submit"
          className="float-end mt-3"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default AddUser;
