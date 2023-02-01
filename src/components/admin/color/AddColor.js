import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Box, TextField, Grid, FormControl, Button } from "@mui/material";

function AddColor() {
  const [input, setInput] = useState({
    color_name: "",
    errors: [],
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      document.title = "Add Color";
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
    formData.append("color_name", input.color_name);

    axios.post(`api/admin/store-color`, formData).then((res) => {
      if (res.data.status === 200) {
        e.target.reset();
        setInput({
          ...input,
          color_name: "",
          errors: [],
        });
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 400) {
        setInput({ ...input, errors: res.data.errors });
      }
    });
  };

  return (
    <Box className="card m-sm-0 m-md-5">
      <Box className="card-header">
        <h4>
          Add Color
          <Link
            to="/admin/view-color"
            className="btn btn-primary btn-sm float-end"
          >
            View Color
          </Link>
        </h4>
      </Box>
      <Box className="card-body" component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-required"
                label="Color Name"
                name="color_name"
                size="small"
                onChange={handleInput}
                value={input.color_name}
                helperText={input.errors.color_name}
              />
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

export default AddColor;
