import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let isMounted = true;
    document.title = "Edit User";
    axios.get(`/api/admin/edit-user/${id}`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setInput(res.data.user);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("password", input.password);
    formData.append("role_as", input.role_as);

    axios.post(`/api/admin/update-user/${id}`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setErrors([]);
      } else if (res.data.status === 422) {
        setErrors(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Updated Failed", res.data.message, "error");
        navigate("/admin/view-user");
      }
    });
  };

  return (
    <Box className="card m-sm-0 m-md-5">
      <Box className="card-header">
        <h4>
          Edit User
          <Link
            to="/admin/view-user"
            className="btn btn-primary btn-sm float-end"
          >
            View User
          </Link>
        </h4>
      </Box>
      <Box
        className="card-body"
        component="form"
        onSubmit={handleUpdate}
        encType="multipart/form-data"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="outlined-required"
                label="Name"
                name="name"
                focused
                value={input.name ?? ""}
                onChange={handleInput}
                helperText={errors.name}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="outlined-required"
                name="email"
                focused
                disabled
                value={input.email ?? ""}
                onChange={handleInput}
                helperText={errors.email}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-static"
                label="Password"
                name="Password"
                type="password"
                value={input.password}
                helperText={errors.password}
                onChange={handleInput}
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
                value={input.role_as ?? ""}
                onChange={handleInput}
                label="Choose Role"
              >
                <MenuItem value="1">Admin</MenuItem>
                <MenuItem value="0">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button variant="contained" type="submit" className="float-end mt-3">
          Update
        </Button>
      </Box>
    </Box>
  );
}

export default EditUser;
