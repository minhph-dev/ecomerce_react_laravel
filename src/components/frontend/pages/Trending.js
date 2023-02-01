import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import CardProduct from "../components/CardProduct";
import axios from "axios";
import CardSkeleton from "../components/CardSkeleton";

export default function Trending() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);
    document.title = "Trending Product";
    axios.get(`/api/trending`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setTrendingProducts(res.data.trendingProducts);
          if (res.data.trendingProducts.length > 0) {
            setLoading(false);
          }
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
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
          Trending Product
        </Typography>
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
    );
  }
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
        Trending Product
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {trendingProducts?.map((item) => {
          return <CardProduct key={item.id} data={item} />;
        })}
      </Grid>
    </Container>
  );
}
