import React from "react";
import { Grid, Skeleton } from "@mui/material";
import styled from "styled-components";
import { mobile, tablet } from "../../../reponsive";

const StyledSkeleton = styled(Skeleton)`
  ${tablet({ height: "297px !important" })}
  ${mobile({ height: "261 !important" })}
`;

export default function CardSkeleton() {
  return (
    <Grid item xs={6} sm={4} md={3}>
      <StyledSkeleton variant="rectangular" height={315} />
    </Grid>
  );
}
