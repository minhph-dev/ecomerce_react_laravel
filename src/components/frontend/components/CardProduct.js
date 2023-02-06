import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import styled from "styled-components";
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  CardActions,
  Button,
  IconButton,
  Modal,
  Box,
  ButtonGroup,
  Tooltip,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveIcon from "@mui/icons-material/Remove";
import CompareIcon from "@mui/icons-material/Compare";
import { tablet } from "../../../reponsive";

const StyledOriginalPrice = styled.span`
  margin-left: 20px;
  color: #7d879c;
  font-weight: 600;
  font-size: 14px;
  text-decoration: line-through;
`;

const InnerModalQuickView = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 900px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 2px solid #000;
  ${tablet({ width: "100%" })}
`;

export default function CardProduct({ data, onClick, compareIcon }) {
  const [openModalQuickView, setOpenModalQuickView] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const handleOpen = () => setOpenModalQuickView(true);
  const handleClose = () => setOpenModalQuickView(false);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };

  const submitAddtoWishList = (product) => {
    const data = {
      product_id: product.id,
    };

    axios.post(`/api/add-to-wishlist`, data).then((res) => {
      if (res.data.status === 201) {
        //Created - Data Inserted
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 409) {
        //Already added to cart
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 401) {
        //Unauthenticated
        swal("Error", res.data.message, "warning");
      } else if (res.data.status === 404) {
        //Not Found
        swal("Warning", res.data.message, "error");
      }
    });
  };

  const submitAddtocart = (product) => {
    const data = {
      product_id: product.id,
      product_color_name: "",
      product_quantity: quantity,
    };

    axios.post(`/api/add-to-cart`, data).then((res) => {
      if (res.data.status === 201) {
        //Created - Data Inserted
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 409) {
        //Already added to cart
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 401) {
        //Unauthenticated
        swal("Error", res.data.message, "warning");
      } else if (res.data.status === 404) {
        //Not Found
        swal("Warning", res.data.message, "error");
      }
    });
  };
  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card>
        <CardActionArea>
          <Link to={`/collections/${data.category.slug}/${data.slug}`}>
            <CardMedia
              component="img"
              image={`${process.env.REACT_APP_DOMAIN}${data.image}`}
              alt={data.product_name}
            />
          </Link>
          <CardContent>
            <Typography
              gutterBottom
              variant="body"
              component="h6"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <Link
                className="text-decoration-none text-capitalize"
                to={`/collections/${data.category.slug}/${data.slug}`}
              >
                {data.product_name}
              </Link>
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgb(210,63,87)", fontWeight: "600" }}
            >
              {data.selling_price}US$
              <StyledOriginalPrice>
                {data.original_price} US$
              </StyledOriginalPrice>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="d-flex justify-content-between">
          <Box className="d-flex">
            <Tooltip title="Add To WishList" arrow>
              <IconButton onClick={() => submitAddtoWishList(data)}>
                <FavoriteBorder color="error" />
              </IconButton>
            </Tooltip>
            <Tooltip title="QuickView" arrow>
              <IconButton onClick={handleOpen} className="d-none d-sm-flex">
                <VisibilityIcon color="error" />
              </IconButton>
            </Tooltip>
            {compareIcon && (
              <Tooltip title="Compare" arrow>
                <IconButton onClick={onClick}>
                  <CompareIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Tooltip title="Add To Cart" arrow>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              sx={{ float: "right" }}
              onClick={() => submitAddtocart(data)}
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </CardActions>
      </Card>

      <Modal
        keepMounted
        open={openModalQuickView}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <InnerModalQuickView className="shadow p-xs-2 p-sm-2 p-md-4">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
              <CardMedia
                component="img"
                className="w-100 h-100"
                sx={{ objectFit: "contain" }}
                image={`${process.env.REACT_APP_DOMAIN}${data.image}`}
                alt={data.product_name}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography
                gutterBottom
                variant="h5"
                component="h1"
                sx={{ textTransform: "capitalize" }}
              >
                {data.product_name}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="h6"
                className="d-flex align-items-center"
              >
                Brand:
                <img
                  src={`${process.env.REACT_APP_DOMAIN}${data.brand.image}`}
                  width="30px"
                  className="mx-2"
                  alt={data.brand.brand_name}
                />
              </Typography>
              <Typography
                color="error"
                gutterBottom
                variant="h4"
                component="h1"
              >
                {data.selling_price} $
              </Typography>
              {data.quantity > 0 ? (
                <Typography color="primary">Stock Available</Typography>
              ) : (
                <Typography color="error" sx={{ marginBottom: 2 }}>
                  Out Of Stock
                </Typography>
              )}

              <ButtonGroup
                size="small"
                aria-label="small button group"
                className="mt-3"
              >
                <Button onClick={handleDecrement}>
                  <RemoveIcon />
                </Button>
                <Button>{quantity}</Button>
                <Button onClick={handleIncrement}>
                  <AddIcon />
                </Button>
              </ButtonGroup>
              <Box sx={{ "& button": { marginRight: 2 }, marginY: 2 }}>
                {data.quantity > 0 && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => submitAddtocart(data)}
                  >
                    Add To Cart
                  </Button>
                )}
                <Button variant="outlined" color="error" onClick={() => submitAddtoWishList(data)}>
                  Add To Wish List
                </Button>
              </Box>
              <Typography gutterBottom variant="body2">
                Description: {data.description}
              </Typography>
            </Grid>
          </Grid>
        </InnerModalQuickView>
      </Modal>
    </Grid>
  );
}
