import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
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

function EditBrand() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [picture, setPicture] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setSelectedFiles([]);
    if (e.target.files) {
      const fileArrayTemp = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedFiles((prevImages) => prevImages.concat(fileArrayTemp));
      setPicture({ image: e.target.files[0] });
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

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/admin/edit-brand/${id}`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCategories(res.data.data.categories);
          setInput(res.data.data.brand);
          document.title = `Edit Brand ${
            res.data.data.brand.brand_name ?? "Edit Brand"
          }`;
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
          navigate("/admin/view-brand");
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
    formData.append("category_name", input.category_name);
    formData.append("brand_name", input.brand_name);
    formData.append("image", picture.image);

    axios.post(`/api/admin/update-brand/${id}`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setErrors([]);
      } else if (res.data.status === 422) {
        setErrors(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        navigate("/admin/view-brand");
      }
    });
  };

  return (
    <Box className="card m-sm-0 m-md-5">
      <Box className="card-header">
        <h4>
          Edit Brand
          <Link
            to="/admin/view-brand"
            className="btn btn-primary btn-sm float-end"
          >
            View Brand
          </Link>
        </h4>
      </Box>
      <Box className="card-body" component="form" onSubmit={handleUpdate}>
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
                value={input.category_name ?? ""}
                onChange={handleInput}
                label="Choose Category"
              >
                {categories?.map((item) => {
                  return (
                    <MenuItem
                      value={item.category_name}
                      key={item.category_name}
                    >
                      {item.category_name}
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
                disabled
                value={input.brand_name ?? ""}
                helperText={errors.brand_name}
              />
            </FormControl>
          </Grid>

          <Grid item xs={7} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-static"
                type="file"
                name="image"
                onChange={handleImage}
              />
            </FormControl>
          </Grid>

          <Grid item xs={5} sm={6}>
            <img
              src={`${process.env.REACT_APP_DOMAIN}${input.image ?? ""}`}
              height="50px"
              alt={input.category_name ?? ""}
            />
          </Grid>

          <Grid item xs={12}>
            {renderPhotos(selectedFiles)}
          </Grid>
        </Grid>

        <Button variant="contained" type="submit" className="mt-3 float-end">
          Update
        </Button>
      </Box>
    </Box>
  );
}

export default EditBrand;
