import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import styled from "styled-components";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Tab,
  TextField,
  Typography,
  Grid,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import ColorizeOutlinedIcon from "@mui/icons-material/ColorizeOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteIcon from "@mui/icons-material/Delete";
import { tablet } from "../../../reponsive";

const StyledTabPanel = styled(TabPanel)`
  ${tablet({ padding: "12px 0" })}
`;

const FilterColor = styled(ColorizeOutlinedIcon)`
  color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tab, setTab] = useState("1");
  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorOfProducts, setColorOfProducts] = useState([]);
  const [picture, setPicture] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [colorQuantity, setColorQuantity] = useState([]);
  const [colorQuantityUpdate, setColorQuantityUpdate] = useState([]);
  const [productInput, setProduct] = useState({
    category_name: "",
    product_name: "",
    brand_name: "",
    description: "",
    original_price: "",
    selling_price: "",
    quantity: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
  });
  const [status, setStatus] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/admin/edit-product/${id}`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setBrands(res.data.data.allBrand);
          setCategories(res.data.data.allCategory);
          setColors(res.data.data.allColor);
          setProduct(res.data.data.product);
          setColorOfProducts(res.data.data.colorOfProducts);
          setStatus(res.data.data.product.status === 1 ? true : false);
          setFeatured(res.data.data.product.featured === 1 ? true : false);
          setTrending(res.data.data.product.trending === 1 ? true : false);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
          navigate("/admin/view-product");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };
  const handleInput = (e) => {
    setProduct({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleColorQuantity = (e) => {
    setColorQuantity({ ...colorQuantity, [e.target.name]: e.target.value });
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
  function deleteHandler(photo) {
    setSelectedFiles(selectedFiles.filter((e) => e !== photo));
    URL.revokeObjectURL(photo);
  }

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

  const updateProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("colorQuantity", JSON.stringify(colorQuantity));

    formData.append("category_name", productInput.category_name);
    formData.append("brand_name", productInput.brand_name);
    formData.append("product_name", productInput.product_name);
    formData.append("description", productInput.description);

    formData.append("meta_title", productInput.meta_title);
    formData.append("meta_keyword", productInput.meta_keyword);
    formData.append("meta_description", productInput.meta_description);

    formData.append("original_price", productInput.original_price);
    formData.append("selling_price", productInput.selling_price);
    formData.append("quantity", productInput.quantity);
    formData.append("featured", featured);
    formData.append("trending", trending);
    formData.append("status", status);

    axios
      .post(`/api/admin/update-product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          setErrors([]);
        } else if (res.data.status === 422) {
          swal("All Fields are mandetory", "", "error");
          setErrors(res.data.errors);
        } else if (res.data.status === 404) {
          swal("Update Failed", res.data.message, "error");
          navigate("/admin/view-product");
        }
      });
  };

  const updateProductColor = (e, color_name) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_id", productInput.id);
    formData.append("colorQuantity", JSON.stringify(colorQuantityUpdate));

    axios
      .post(`/api/admin/product-color/${color_name}`, formData)
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
        } else if (res.data.status === 404) {
          swal("Update Failed", res.data.message, "error");
        }
      });
  };

  const deleteProductColor = (e, color_name) => {
    e.preventDefault();

    axios
      .delete(`/api/admin/product-color/${color_name}/delete`)
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          setColorOfProducts(
            colorOfProducts.filter(function (color) {
              return color.color_name !== color_name;
            })
          );
        } else if (res.data.status === 404) {
          swal("Delete Failed", res.data.message, "error");
        }
      });
  };

  return (
    <Box className="card m-sm-0 m-md-5">
      <Box className="card-header">
        <h4>
          Edit Product
          <Link
            to="/admin/view-product"
            className="btn btn-primary btn-sm float-end"
          >
            View Product
          </Link>
        </h4>
      </Box>
      <Box className="card-body">
        <Box
          component="form"
          onSubmit={updateProduct}
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
                      value={productInput.category_name}
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

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Choose Brand
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="brand_name"
                      value={productInput.brand_name}
                      onChange={handleInput}
                      label="Choose Brand"
                    >
                      {brands?.map((item) => {
                        return (
                          <MenuItem
                            value={item.brand_name}
                            key={item.brand_name}
                          >
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
                      label="Name"
                      name="product_name"
                      value={productInput.product_name}
                      onChange={handleInput}
                      helperText={errors.product_name}
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
                      value={productInput.description}
                      onChange={handleInput}
                      size="small"
                      helperText={errors.description}
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
                      value={productInput.meta_title}
                      helperText={errors.meta_title}
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
                      value={productInput.meta_keyword}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-multiline-static"
                      label="Meta Description"
                      multiline
                      rows={4}
                      name="meta_description"
                      onChange={handleInput}
                      value={productInput.meta_description}
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
                      value={productInput.original_price}
                      helperText={errors.original_price}
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
                      value={productInput.selling_price}
                      helperText={errors.selling_price}
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
                      value={productInput.quantity}
                      helperText={errors.quantity}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Checkbox
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Status (Checked = Hidden)
                </Grid>

                <Grid item xs={12} md={6}>
                  <Checkbox
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Featured (Checked = Show)
                </Grid>

                <Grid item xs={12} md={6}>
                  <Checkbox
                    checked={trending}
                    onChange={(e) => setTrending(e.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Trending (Checked = Show)
                </Grid>

                <Grid item xs={7}>
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
                      type="file"
                      multiple
                      name="image[]"
                      onChange={handleImage}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={5}>
                  <img
                    src={`https://pacific-depths-48667.herokuapp.com/${productInput.image ?? ""}`}
                    width="50px"
                    alt={productInput.product_name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box>{renderPhotos(selectedFiles)}</Box>
                </Grid>
              </Grid>

              {colorOfProducts.length > 0 && (
                <Typography
                  sx={{ marginTop: 3 }}
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  Current Color :
                </Typography>
              )}
              <Grid container spacing={2}>
                {colorOfProducts?.map((color, idx) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      key={idx}
                      sx={{ display: "flex" }}
                    >
                      <TextField
                        label={
                          <>
                            <FilterColor
                              color={color.color_name}
                              key={color.color_name}
                            />
                            <span>{color.quantity}</span>
                          </>
                        }
                        type="number"
                        size="small"
                        name={color.color_name}
                        onChange={(e) => {
                          setColorQuantityUpdate({
                            ...colorQuantityUpdate,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      />
                      <IconButton
                        aria-label="add an alarm"
                        onClick={(e) => updateProductColor(e, color.color_name)}
                      >
                        <SaveAsIcon />
                      </IconButton>
                      <IconButton
                        aria-label="add an alarm"
                        onClick={(e) => deleteProductColor(e, color.color_name)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  );
                })}
              </Grid>

              {colors.length > 0 && (
                <Typography
                  sx={{ marginTop: 3 }}
                  gutterBottom
                  variant="h6"
                  component="div"
                >
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
            </StyledTabPanel>
          </TabContext>
          <Button variant="contained" type="submit" className="float-end">
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EditProduct;
