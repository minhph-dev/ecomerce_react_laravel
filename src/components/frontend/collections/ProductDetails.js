import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  CardMedia,
  Container,
  Grid,
  Skeleton,
  Typography,
  Button,
  Box,
  ButtonGroup,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import BoltIcon from "@mui/icons-material/Bolt";
import CardProduct from "../components/CardProduct";

const FilterContainer = styled.div`
  width: 50%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

function ProductDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [relativeOfCat, setRelativeOfCat] = useState([]);
  const [relativeOfBrand, setRelativeOfBrand] = useState([]);
  const [colorOfProducts, setColorOfProducts] = useState([]);
  const [colorChoose, setColorChoose] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);
    const category_slug = params.category;
    const product_slug = params.product;
    axios
      .get(`/api/product-details/${category_slug}/${product_slug}`)
      .then((res) => {
        if (isMounted) {
          if (res.data.status === 200) {
            setProduct(res.data.data.product[0].product);
            setColorOfProducts(res.data.data.product[0].colorOfProducts);
            setRelativeOfCat(res.data.data.relativeProductOfCategory);
            setRelativeOfBrand(res.data.data.relativeProductOfBrand);
            document.title = `${res.data.data.product[0].product.product_name}`;
            setLoading(false);
          } else if (res.data.status === 404) {
            navigate("/collections");
            swal("Warning", res.data.message, "error");
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, [navigate, params.category, params.product]);

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

  const submitAddtocart = (e) => {
    e.preventDefault();
    const data = {
      product_id: product.id,
      product_color_name: colorChoose,
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

  if (loading) {
    return (
      <Box>
        <Box className="mb-3">
          <Skeleton variant="rectangular" height={40} />
        </Box>
        <Grid container spacing={3} sx={{ padding: "0 5%" }}>
          <Grid item xs={12} md={5}>
            <Skeleton variant="rectangular" height={331} />
          </Grid>
          <Grid item xs={12} md={7}>
            <Skeleton variant="rectangular" height={331} />
          </Grid>
        </Grid>
      </Box>
    );
  }
  return (
    <Box>
      <Box className="py-2 mb-3" sx={{ background: "#F8F8F8" }}>
        <Container>
          <Typography>
            <Link to="/collections" className="text-decoration-none">
              Collections
            </Link>
            /
            <Link
              to={`/collections/${product.category.slug} ?? ""`}
              className="text-decoration-none"
            >
              {product.category_name}
            </Link>
            / {product.product_name}
          </Typography>
        </Container>
      </Box>

      <Grid container spacing={3} sx={{ padding: "0 5%" }}>
        <Grid item xs={12} md={5}>
          <CardMedia
            component="img"
            image={`https://pacific-depths-48667.herokuapp.com/${product.image}`}
            alt={product.product_name}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            sx={{ textTransform: "capitalize" }}
          >
            {product.product_name}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="h6"
            className="d-flex align-items-center"
          >
            Brand:
            <img
              src={`https://pacific-depths-48667.herokuapp.com/${product.brand.image}`}
              width="30px"
              className="mx-2"
              alt={product.brand.brand_name}
            />
          </Typography>
          <Typography color="error" gutterBottom variant="h4" component="h1">
            {product.selling_price} $
          </Typography>
          {product.quantity > 0 ? (
            <Typography color="primary">Stock Available</Typography>
          ) : (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              Out Of Stock
            </Typography>
          )}

          {colorOfProducts.length > 0 && (
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {colorOfProducts?.map((color) => (
                  <FilterColor
                    color={color.color_name}
                    key={color.color_name}
                    onClick={() => setColorChoose(color.color_name)}
                  />
                ))}
              </Filter>
            </FilterContainer>
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
            {product.quantity > 0 && (
              <Button
                variant="contained"
                color="error"
                onClick={submitAddtocart}
              >
                Add To Cart
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              onClick={() => submitAddtoWishList(product)}
            >
              Add To Wish List
            </Button>
          </Box>
          <Typography gutterBottom variant="body2">
            Description: {product.description}
          </Typography>
        </Grid>
      </Grid>
      <Container className="mt-5">
        <Typography
          sx={{ marginTop: 3 }}
          gutterBottom
          variant="h5"
          component="h1"
          className="fw-bold mb-2"
        >
          <BoltIcon />
          Relative {product.brand_name} Product
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {relativeOfBrand?.map((item) => {
            return <CardProduct key={item.id} data={item} />;
          })}
        </Grid>
      </Container>
      <Container className="mt-5">
        <Typography
          sx={{ marginTop: 3 }}
          gutterBottom
          variant="h5"
          component="h1"
          className="fw-bold mb-2"
        >
          <BoltIcon />
          Relative {product.category_name} Product
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {relativeOfCat?.map((item) => {
            return <CardProduct key={item.id} data={item} />;
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductDetail;
