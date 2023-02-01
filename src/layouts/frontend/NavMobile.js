import { Link } from "react-router-dom";
import styled from "styled-components";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, CssBaseline, Paper } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { NewReleases, Phone } from "@mui/icons-material";

const NavItem = styled(Link)`
  height: 64px;
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color:#333;
`;

export default function NavMobile() {
  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        className="d-flex"
      >
        <NavItem to="/collections">
          <CategoryIcon />
          Collections
        </NavItem>
        <NavItem to="/trending">
          <TrendingUpIcon />
          Trending
        </NavItem>
        <NavItem to="/featured">
          <NewReleases />
          Featured
        </NavItem>
        <NavItem to="/contact">
          <Phone />
          Contact
        </NavItem>
      </Paper>
    </Box>
  );
}
