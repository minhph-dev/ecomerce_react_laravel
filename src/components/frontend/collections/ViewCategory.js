import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Grid, CardActionArea, CardMedia, Skeleton } from "@mui/material";

function ViewCategory() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMountered = true;
    window.scrollTo(0, 0);
    document.title = "Collections";
    axios.get(`/api/all-categories`).then((res) => {
      if (isMountered) {
        if (res.data.status === 200) {
          setCategories(res.data.categories);
          if (res.data.categories.length > 0) {
            setLoading(false);
          }
        }
      }
    });
    return () => {
      isMountered = false;
    };
  }, []);

  if (loading) {
    return (
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ padding: "0 5%" }}
        className="mt-2"
      >
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rectangular" height={300} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rectangular" height={300} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rectangular" height={300} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rectangular" height={300} />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      sx={{ padding: "0 5%" }}
      className="mt-2"
    >
      {categories?.map((category) => {
        return (
          <Grid item xs={12} sm={6} md={3} key={category.category_name}>
            <Card>
              <CardActionArea>
                <Link to={`/collections/${category.slug}`}>
                  <CardMedia
                    component="img"
                    height="300"
                    sx={{ objectFit: "contain" }}
                    image={`https://pacific-depths-48667.herokuapp.com/${category.image}`}
                    alt={category.category_name}
                  />
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ViewCategory;
