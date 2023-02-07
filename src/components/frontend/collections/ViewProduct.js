import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Modal,
  Skeleton,
  Typography,
} from "@mui/material";
import CardProduct from "../components/CardProduct";
import ClearIcon from "@mui/icons-material/Clear";
import CardCompare from "../components/CardCompare";
import CardSkeleton from "./../components/CardSkeleton";
import styled from "styled-components";
import { tablet } from "../../../reponsive";

const StyledGrid = styled(Grid)`
  ${tablet({ width: "100% !important", margin: "0 !important" })}
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};
function ViewProduct(props) {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [openModalCompare, setOpenModalCompare] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);
    axios.get(`/api/fetch-products/${slug}`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setProducts(res.data.data.products);
          setCategory(res.data.data.category);
          setBrands(res.data.data.brands);
          document.title = `Collections ${res.data.data.category.category_name}`;
          setLoading(false);
        } else if (res.data.status === 400) {
          swal("Warning", res.data.message, "");
        } else if (res.data.status === 404) {
          navigate("/collections");
          swal("Warning", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate, slug]);

  const handleFilter = (brand_name) => {
    let isMounted = true;
    axios.get(`/api/filter-by-brand/${brand_name}`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setProducts(res.data.products);
          document.title = `Collections ${brand_name}`;
        } else if (res.data.status === 400) {
          swal("Warning", res.data.message, "");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  };
  const handleFilterAll = () => {
    axios.get(`/api/fetch-products/${slug}`).then((res) => {
      if (res.data.status === 200) {
        setProducts(res.data.data.products);
      } else if (res.data.status === 400) {
        swal("Warning", res.data.message, "");
      } else if (res.data.status === 404) {
        navigate("/collections");
        swal("Warning", res.data.message, "error");
      }
    });
  };

  const handleCompare = (item) => {
    if (compareList.length <= 2) {
      setCompareList((compareList) => [...compareList, item]);
    } else {
      swal("Warning", "Maximum 3 Product To Compare", "warning");
    }
  };

  if (loading) {
    return (
      <Box>
        <Box className="mb-3" sx={{ background: "#F8F8F8" }}>
          <Skeleton variant="rectangular" height={40} />
        </Box>
        <Grid
          container
          spacing={2}
          className="mt-3 mb-5 card-header"
          sx={{ paddingX: "7.5%" }}
        >
          <Skeleton variant="rectangular" height={82} />
        </Grid>
        <Container>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </Grid>
        </Container>
      </Box>
    );
  }
  return (
    <Box>
      <Box className="py-2 mb-3" sx={{ background: "#F8F8F8" }}>
        <Container>
          <Box>
            <Link to="/collections" className="text-decoration-none me-1">
              Collections
            </Link>
            /
            <Link
              to={`/collections/${category.slug} ?? ""`}
              className="text-decoration-none ms-2"
            >
              {category.category_name}
            </Link>
          </Box>
        </Container>
      </Box>
      <Grid
        container
        spacing={2}
        className="mt-3 mb-5 card-header"
        sx={{ paddingX: "7.5%" }}
      >
        <Grid
          item
          xs={6}
          sm={4}
          md={2}
          sx={{ marginLeft: "0 !important", paddingLeft: "0" }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="p"
            className="fw-500"
          >
            <Button
              className="w-100 d-flex justify-content-center text-dark"
              onClick={handleFilterAll}
              variant="outlined"
              style={{ height: "42px" }}
            >
              All Brand
            </Button>
          </Typography>
        </Grid>
        {brands?.map((item) => {
          return (
            <Grid item xs={6} sm={4} md={2} key={item.brand_name}>
              <Button
                variant="outlined"
                className="d-flex align-items-center w-100 justify-content-center text-dark"
                onClick={() => handleFilter(item.brand_name)}
                style={{ height: "42px" }}
              >
                <img
                  src={`${process.env.REACT_APP_DOMAIN}${item.image}`}
                  width="30px"
                  className="me-3"
                  alt={item.brand_name}
                />
                {item.brand_name}
              </Button>
            </Grid>
          );
        })}
      </Grid>

      <Container>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {products?.map((item) => {
            return (
              <CardProduct
                key={item.id}
                compareIcon={true}
                data={item}
                onClick={() => {
                  handleCompare(item);
                }}
              />
            );
          })}
        </Grid>
      </Container>

      <StyledGrid
        container
        sx={{
          width: "90%",
          margin: "0 5%",
          bottom: "0",
          zIndex: "10",
        }}
        className="position-fixed bg-light shadow"
      >
        <Grid item xs={9} className="d-flex w-100 bg-warning">
          {compareList?.map((item) => {
            return (
              <CardCompare
                key={item.id}
                data={item}
                onClick={() => {
                  setCompareList(
                    compareList.filter(function (compareItem) {
                      return compareItem.id !== item.id;
                    })
                  );
                }}
              />
            );
          })}
        </Grid>
        <Grid item xs={3} className="d-flex w-100 bg-warning">
          {compareList.length > 1 && (
            <Grid item xs={12}>
              <Card className="h-100 d-flex align-items-center justify-content-center flex-column">
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenModalCompare(true);
                  }}
                >
                  Compare
                </Button>
                <Button
                  className="mt-2 text-capitalize"
                  onClick={() => {
                    setCompareList([]);
                  }}
                >
                  Delete All Product
                </Button>
              </Card>
            </Grid>
          )}
        </Grid>
      </StyledGrid>

      <Modal
        keepMounted
        open={openModalCompare}
        onClose={() => {
          setOpenModalCompare(false);
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} className="p-0">
          <Box
            className="d-flex justify-content-between w-100  px-sm-0 px-md-3 my-3"
            onClick={() => {
              setOpenModalCompare(false);
            }}
          >
            Compare {category.category_name}
            <ClearIcon />
          </Box>
          <Grid container className="px-sm-0 px-md-3">
            {compareList?.map((item) => {
              return (
                <Grid
                  key={item.id}
                  item
                  xs={compareList.length === 3 ? 4 : 6}
                  sx={{ border: "1px solid #ccc" }}
                  className="p-0 m-0"
                >
                  <Box className="d-flex justify-content-center">
                    {compareList.length > 2 && (
                      <IconButton
                        sx={{ border: "1px solid #ccc", fontSize: "20px" }}
                        onClick={() => {
                          setCompareList(
                            compareList.filter(function (compareItem) {
                              return compareItem.id !== item.id;
                            })
                          );
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                    <CardMedia
                      component="img"
                      image={`${process.env.REACT_APP_DOMAIN}${item.image}`}
                      alt={item.product_name}
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
                        className="text-decoration-none"
                        to={`/collections/${item.category.slug}/${item.slug}`}
                      >
                        {item.product_name}
                      </Link>
                    </Typography>
                    <Typography
                      variant="body2"
                      className="my-3"
                      sx={{ color: "rgb(210,63,87)", fontWeight: "600" }}
                    >
                      {item.selling_price}US$
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="h6"
                      className="d-flex align-items-center mb-3"
                    >
                      Brand:
                      <img
                        src={`${process.env.REACT_APP_DOMAIN}${item.brand.image}`}
                        width="30px"
                        className="mx-2"
                        alt={item.brand.brand_name}
                      />
                    </Typography>
                    <Typography variant="body2">{item.description}</Typography>
                  </CardContent>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}

export default ViewProduct;
