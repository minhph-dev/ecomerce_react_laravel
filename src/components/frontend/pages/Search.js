import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import CardProduct from "../components/CardProduct";
import axios from "axios";
import CardSkeleton from "../components/CardSkeleton";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const { productname } = useParams();
  const [searchProducts, setSearchProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);
    document.title = "Search";
    axios
      .get(`/api/search-product`, {
        params: {
          keyword: productname,
        },
      })
      .then((res) => {
        if (isMounted) {
          if (res.data.status === 200) {
            setSearchProducts(res.data.searchProducts);
          } else if (res.data.status === 404) {
            swal("Error", res.data.message, "error");
            navigate("/");
          }
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [productname, navigate]);

  if (loading) {
    return (
      <Container>
        <Typography
          sx={{ marginTop: 3 }}
          gutterBottom
          variant="h5"
          component="h1"
          className="fw-bold mb-2"
        >
          <BoltIcon />
          Search Product
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </Grid>
      </Container>
    );
  }
  return (
    <Container>
      {searchProducts.length > 0 && (
        <Typography
          sx={{ marginTop: 3 }}
          gutterBottom
          variant="h5"
          component="h1"
          className="fw-bold mb-2"
        >
          <BoltIcon />
          Search Product
        </Typography>
      )}
      {searchProducts.length > 0 ? (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {searchProducts?.map((item) => {
            return <CardProduct key={item.id} data={item} />;
          })}
        </Grid>
      ) : (
        <Box className="card text-center py-5 my-5">
          <h4>No Product Found</h4>
        </Box>
      )}
    </Container>
  );
}
