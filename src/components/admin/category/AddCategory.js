import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { TextField, Grid, FormControl, Box, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function AddCategory() {
  const [picture, setPicture] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [input, setInput] = useState({
    category_name: "",
    description: "",
    errors: [],
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      document.title = "Add Category";
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInput = (e) => {
    e.persist();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setSelectedFiles([]);
    if (e.target.files) {
      const fileArrayTemp = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setPicture({ image: e.target.files[0] });
      console.log(picture.image);
      setSelectedFiles((prevImages) => prevImages.concat(fileArrayTemp));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <Box key={photo}>
          <img src={photo} alt="" style={{ width: "10%" }} />
          <span onClick={() => deleteHandler(photo)}>
            <ClearIcon />
          </span>
        </Box>
      );
    });
  };

  function deleteHandler(photo) {
    setSelectedFiles(selectedFiles.filter((e) => e !== photo));
    URL.revokeObjectURL(photo);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category_name", input.category_name);
    formData.append("image", picture.image);
    formData.append("description", input.description);

    axios
      .post(`api/admin/store-category`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          e.target.reset();
          swal("Success", res.data.message, "success");
          setInput({
            ...input,
            category_name: "",
            description: "",
            errors: [],
          });
        } else if (res.data.status === 400) {
          setInput({ ...input, errors: res.data.errors });
        }
      });
  };

  return (
    <Box className="card m-sm-0 m-md-5">
      <Box className="card-header">
        <h4>
          Add Category
          <Link
            to="/admin/view-category"
            className="btn btn-primary btn-sm float-end"
          >
            View Category
          </Link>
        </h4>
      </Box>
      <Box className="card-body" component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-required"
                label="Name"
                name="category_name"
                onChange={handleInput}
                value={input.category_name}
                size="small"
                helperText={input.errors.category_name}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-static"
                type="file"
                name="image"
                onChange={handleImage}
                helperText={input.errors.image}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            {renderPhotos(selectedFiles)}
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                name="description"
                onChange={handleInput}
                size="small"
                value={input.description}
                helperText={input.errors.description}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Button variant="contained" type="submit" className="mt-3 float-end">
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default AddCategory;
