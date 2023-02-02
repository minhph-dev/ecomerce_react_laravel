import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
export default function CardCompare({ data, onClick }) {
  return (
    <Grid item xs={4}>
      <Card>
        <CardActionArea>
          <Typography
            to={`/collections/${data.category.slug}/${data.slug}`}
            className="position-relative"
          >
            <CardMedia
              sx={{ height: "80px", objectFit: "contain" }}
              component="img"
              image={`https://pacific-depths-48667.herokuapp.com/${data.image}`}
              alt={data.product_name}
            />
            <ClearIcon
              className="position-absolute"
              sx={{ right: "10px", top: "0" }}
              onClick={onClick}
            />
          </Typography>
          <CardContent>
            <Typography
              gutterBottom
              variant="body"
              component="h6"
              className="text-center"
              to={`/collections/${data.category.slug}/${data.slug}`}
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {data.product_name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
