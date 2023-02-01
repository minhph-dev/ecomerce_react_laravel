import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { WrapperContext } from "../../context/WrapperContext";

const StyledGrid = styled(Grid)`
  padding: 2% 5%;
  background-color: #222935;
`;
const StyledIconButton = styled(IconButton)`
  background-color: #1b212a !important;
  color: white !important;
  margin-right: 8px !important;
`;

const StyledTypograpy = styled(Typography)`
  color: #aeb4be;
  &:hover {
    color: white;
    cursor: pointer;
  }
`;

export default function Footer() {
  const { setting } = useContext(WrapperContext);

  return (
    <StyledGrid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <Typography
          sx={{ marginTop: 3 }}
          gutterBottom
          variant="h4"
          component="div"
          className="text-white"
        >
          {setting.wedsite_name ?? "ECOMERCE"}
        </Typography>
        <Typography
          sx={{ marginTop: 3 }}
          gutterBottom
          variant="body"
          component="p"
          className="text-white"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero
          id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus
          vel ut sollicitudin elit at amet.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography
          sx={{ marginTop: 3 }}
          gutterBottom
          variant="h6"
          component="div"
          className="text-white"
        >
          About Us
        </Typography>
        <StyledTypograpy
          sx={{ marginTop: 3 }}
          gutterBottom
          variant="body2"
          component="p"
        >
          Careers
        </StyledTypograpy>
        <StyledTypograpy
          sx={{ marginTop: 2 }}
          gutterBottom
          variant="body2"
          component="p"
        >
          Our Stores
        </StyledTypograpy>
        <StyledTypograpy
          sx={{ marginTop: 2 }}
          gutterBottom
          variant="body2"
          component="p"
        >
          Our Cares
        </StyledTypograpy>
        <StyledTypograpy
          sx={{ marginTop: 2 }}
          gutterBottom
          variant="body2"
          component="p"
        >
          Terms & Conditions
        </StyledTypograpy>
        <StyledTypograpy
          sx={{ marginTop: 2 }}
          gutterBottom
          variant="body2"
          component="p"
        >
          Privacy Policy
        </StyledTypograpy>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography
          sx={{ marginTop: 3 }}
          gutterBottom
          variant="h6"
          component="div"
          className="text-white"
        >
          Customer Care
        </Typography>
        <StyledTypograpy
          sx={{ marginTop: 2 }}
          gutterBottom
          variant="body2"
          component="p"
        >
          Help Center
        </StyledTypograpy>
        <StyledTypograpy
          sx={{ marginTop: 2 }}
          gutterBottom
          variant="body2"
          component="p"
        >
          How to Buy
        </StyledTypograpy>
        <StyledTypograpy
          sx={{ marginTop: 2 }}
          gutterBottom
          variant="body2"
          component="p"
        >
          Track Your Order
        </StyledTypograpy>
        <StyledTypograpy
          sx={{ marginTop: 2 }}
          gutterBottom
          variant="body2"
          component="p"
        >
          Corporate & Bulk Purchasing
        </StyledTypograpy>
        <StyledTypograpy
          sx={{ marginTop: 2 }}
          gutterBottom
          variant="body2"
          component="p"
        >
          Returns & Refunds
        </StyledTypograpy>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography
          sx={{ marginTop: 3 }}
          gutterBottom
          variant="h6"
          component="div"
          className="text-white"
        >
          Contact Us
        </Typography>
        <StyledTypograpy
          sx={{ marginTop: 2 }}
          gutterBottom
          variant="body2"
          component="p"
        >
          {setting.address ?? "590 Đ. Cách Mạng Tháng 8, Phường 11, Quận 3, Thành phố Hồ Chí Minh 723564, Việt Nam"}
        </StyledTypograpy>
        <StyledTypograpy
          sx={{ marginTop: 2 }}
          gutterBottom
          variant="body2"
          component="p"
        >
          Email: {setting.email1 ?? "sendmailprod.dev@gmail.com"}
        </StyledTypograpy>
        <StyledTypograpy
          sx={{ marginTop: 2 }}
          gutterBottom
          variant="body2"
          component="p"
        >
          Phone: {setting.phone1 ?? "0354868289"}
        </StyledTypograpy>
        <Grid>
          <StyledIconButton>
            <FacebookIcon />
          </StyledIconButton>
          <StyledIconButton>
            <InstagramIcon />
          </StyledIconButton>
          <StyledIconButton>
            <GoogleIcon />
          </StyledIconButton>
          <StyledIconButton>
            <GitHubIcon />
          </StyledIconButton>
        </Grid>
      </Grid>
    </StyledGrid>
  );
}
