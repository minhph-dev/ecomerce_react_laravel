import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import styled from "styled-components";
import {
  Box,
  Tab,
  TextField,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ClearIcon from "@mui/icons-material/Clear";
import ColorizeOutlinedIcon from "@mui/icons-material/ColorizeOutlined";
import { tablet } from "../../../reponsive";

const StyledTabPanel = styled(TabPanel)`
  ${tablet({ padding: "12px 0" })}
`;

const FilterColor = styled(ColorizeOutlinedIcon)`
  color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

function AddProduct() {
  const [tab, setTab] = useState("1");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [picture, setPicture] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [colorQuantity, setColorQuantity] = useState([]);
  const [errorlist, setError] = useState([]);
  const [input, setInput] = useState({
    category_name: "",
    product_name: "",
    brand_name: "",
    description: "",
    original_price: "",
    selling_price: "",
    quantity: "",
    trending: "",
    featured: "",
    status: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
  });

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/admin/create-product`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCategories(res.data.data.allCategory);
          setBrands(res.data.data.allBrand);
          setColors(res.data.data.allColor);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleColorQuantity = (e) => {
    setColorQuantity({ ...colorQuantity, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    if (e.target.files) {
      const fileArrayTemp = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setPicture({ image: e.target.files[0] });
      setSelectedFiles((prevImages) => prevImages.concat(fileArrayTemp));
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <Box key={photo}>
          <img src={photo} key={photo} alt="" style={{ width: "10%" }} />
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
    formData.append("image", picture.image);
    formData.append("colorQuantity", JSON.stringify(colorQuantity));

    formData.append("category_name", input.category_name);
    formData.append("brand_name", input.brand_name);
    formData.append("product_name", input.product_name);
    formData.append("description", input.description);

    formData.append("meta_title", input.meta_title);
    formData.append("meta_keyword", input.meta_keyword);
    formData.append("meta_description", input.meta_description);

    formData.append("original_price", input.original_price);
    formData.append("selling_price", input.selling_price);
    formData.append("quantity", input.quantity);
    formData.append("featured", input.featured);
    formData.append("trending", input.trending);
    formData.append("status", input.status);

    axios.post(`/api/admin/store-product`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setInput({
          ...input,
          category_name: "",
          product_name: "",
          brand_name: "",
          description: "",
          original_price: "",
          selling_price: "",
          quantity: "",
          trending: "",
          featured: "",
          status: "",
          meta_title: "",
          meta_keyword: "",
          meta_description: "",
        });
        setError([]);
      } else if (res.data.status === 422) {
        setError(res.data.errors);
      }
    });
  };

  return (
    <Box className="card m-sm-0 m-md-5">
      <Box className="card-header">
        <h4>
          Add Product
          <Link
            to="/admin/view-product"
            className="btn btn-primary btn-sm float-end"
          >
            View Product
          </Link>
        </h4>
      </Box>
      <Box
        className="card-body"
        component="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API/admin tabs example"
            >
              <Tab label="Home" value="1" />
              <Tab label="SEO Tags" value="2" />
              <Tab label="Other Details" value="3" />
            </TabList>
          </Box>
          <StyledTabPanel value="1">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
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
                  {errorlist.category_name && (
                    <small>
                      <small
                        style={{
                          color: "rgba(0, 0, 0, 0.6)",
                          marginLeft: "14px",
                        }}
                      >
                        {errorlist.category_name}
                      </small>
                    </small>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Choose Brand
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="brand_name"
                    value={input.brand_name}
                    onChange={handleInput}
                    label="Choose Brand"
                  >
                    {brands?.map((item) => {
                      return (
                        <MenuItem value={item.brand_name} key={item.brand_name}>
                          {item.brand_name}
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
                    label="Product Name"
                    name="product_name"
                    value={input.product_name}
                    onChange={handleInput}
                    helperText={errorlist.product_name}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    name="description"
                    value={input.description}
                    onChange={handleInput}
                    size="small"
                    helperText={errorlist.description}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </StyledTabPanel>
          <StyledTabPanel value="2">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-required"
                    label="Meta Title"
                    name="meta_title"
                    onChange={handleInput}
                    value={input.meta_title}
                    helperText={errorlist.meta_title}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-required"
                    label="Meta Keywords"
                    name="meta_keyword"
                    onChange={handleInput}
                    value={input.meta_keyword}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-multiline-static"
                    label="Meta Description"
                    multiline
                    rows={4}
                    name="meta_description"
                    onChange={handleInput}
                    value={input.meta_description}
                    size="small"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </StyledTabPanel>
          <StyledTabPanel value="3">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-required"
                    label="Original Price"
                    name="original_price"
                    onChange={handleInput}
                    value={input.original_price}
                    helperText={errorlist.original_price}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-required"
                    label="Selling Price"
                    name="selling_price"
                    onChange={handleInput}
                    value={input.selling_price}
                    helperText={errorlist.selling_price}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-required"
                    label="Quantity"
                    name="quantity"
                    onChange={handleInput}
                    value={input.quantity}
                    helperText={errorlist.quantity}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={<Checkbox />}
                  name="status"
                  onChange={handleInput}
                  value={input.status}
                  label="Status (checked=Hidden)"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={<Checkbox />}
                  name="featured"
                  onChange={handleInput}
                  value={input.featured}
                  label="Featured (checked=shown)"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={<Checkbox />}
                  name="Trending"
                  onChange={handleInput}
                  value={input.trending}
                  label="Popular (checked=shown)"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  sx={{
                    border: "1px solid #C4C4C4",
                    padding: "10px",
                    borderRadius: "4px",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <input
                    style={{ color: "rgba(0, 0, 0, 0.6)" }}
                    type="file"
                    multiple={true}
                    name="image[]"
                    onChange={handleImage}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box>{renderPhotos(selectedFiles)}</Box>
              </Grid>

              <Grid item xs={12}>
                {colors.length > 0 && (
                  <Typography gutterBottom variant="h6" component="div">
                    Choose Color :
                  </Typography>
                )}
                <Grid container spacing={3}>
                  {colors?.map((color, idx) => {
                    return (
                      <Grid item xs={6} sm={3} md={4} key={idx}>
                        <TextField
                          label={
                            <FilterColor
                              color={color.color_name}
                              key={color.color_name}
                            />
                          }
                          type="number"
                          size="small"
                          name={color.color_name}
                          onChange={handleColorQuantity}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </StyledTabPanel>
        </TabContext>
        <Button variant="contained" type="submit" className="float-end">
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default AddProduct;
