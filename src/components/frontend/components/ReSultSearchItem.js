import { Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledOriginalPrice = styled.span`
  margin-left: 20px;
  color: #7d879c;
  font-weight: 600;
  font-size: 14px;
  text-decoration: line-through;
`;

const Wrapper = styled(Link)`
  &:hover {
    background-color: #eee !important;
  }
`;

export default function ReSultSearchItem({ data }) {
  return (
    <Wrapper
      to={`/collections/${data.category.slug}/${data.slug}`}
      className="my-2 bg-white p-2 d-block text-decoration-none"
    >
      <Grid container>
        <Grid item xs={2} sx={{ background: "#fff" }}>
          <img
            className="w-100"
            src={`http://localhost:8000/${data.image}`}
            alt={data.product_name}
            width="50"
          />
        </Grid>

        <Grid item xs={10} className="px-2">
          <Typography
            className="text-capitalize"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {data.product_name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgb(210,63,87)", fontWeight: "600" }}
          >
            {data.selling_price}US$
            <StyledOriginalPrice>{data.original_price} US$</StyledOriginalPrice>
          </Typography>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
