import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Container, Grid, Skeleton, Typography } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import TrendingCarousel from "../components/TrendingCarousel";
import HomeCarousel from "../components/HomeCarousel";
import CardProduct from "../components/CardProduct";

const Wrapper = styled.div`
  background-color: #f6f9fc;
`;

function Home() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);
    document.title = "Home";
    axios.get(`/api/home`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setBanners(res.data.data.banners);
          setTrendingProducts(res.data.data.trendingProducts);
          setFeaturedProducts(res.data.data.featuredProducts);
          if (res.data.data.banners.length > 0) {
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
    return <Skeleton variant="rectangular" height={500} />;
  }
  return (
    <Wrapper>
      {banners && <HomeCarousel data={banners} />}
      {trendingProducts.length > 0 && (
        <Container className="mt-5">
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
          <TrendingCarousel data={trendingProducts} />
        </Container>
      )}
      {featuredProducts.length > 0 && (
        <Container sx={{ marginTop: "80px" }}>
          <Typography
            sx={{ marginTop: 3 }}
            gutterBottom
            variant="h5"
            component="h1"
            className="fw-bold mb-2"
          >
            <BoltIcon />
            Featured Product
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {featuredProducts?.map((item) => {
              return <CardProduct key={item.id} data={item} />;
            })}
          </Grid>
        </Container>
      )}
    </Wrapper>
  );
}

export default Home;
