import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import {
  Box,
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function AddBrand() {
  const [picture, setPicture] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState({
    category_name: "",
    brand_name: "",
    errors: [],
  });

  useEffect(() => {
    let isMounted = true;
    document.title = "Add Brand";
    axios.get(`/api/admin/all-category`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCategories(res.data.categories);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
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

  const handleImage = (e) => {
    setSelectedFiles([]);
    if (e.target.files) {
      const fileArrayTemp = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setPicture({ image: e.target.files[0] });
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
    formData.append("brand_name", input.brand_name);
    formData.append("image", picture.image);

    axios
      .post(`api/admin/store-brand`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          e.target.reset();
          setInput({
            ...input,
            category_name: "",
            brand_name: "",
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
          Add Brand
          <Link
            to="/admin/view-brand"
            className="btn btn-primary btn-sm float-end"
          >
            View Brand
          </Link>
        </h4>
      </Box>
      <Box className="card-body" component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Choose Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="category_name"
                value={input.category_name}
                onChange={handleInput}
                label="Choose Category"
              >
                {categories?.map((category) => {
                  return (
                    <MenuItem
                      value={category.category_name}
                      key={category.category_name}
                    >
                      {category.category_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-required"
                label="Brand Name"
                name="brand_name"
                onChange={handleInput}
                value={input.brand_name}
                helperText={input.errors.brand_name}
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
        </Grid>

        <Button variant="contained" type="submit" className="mt-3 float-end">
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default AddBrand;
