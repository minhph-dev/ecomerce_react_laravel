import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, CssBaseline, Paper } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { NewReleases, Phone } from "@mui/icons-material";

const Wrapper = styled(Box)`
  .active {
    color: var(--bs-blue);
  }
`;

const NavItem = styled(NavLink)`
  height: 64px;
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #333;
`;

export default function NavMobile() {
  return (
    <Wrapper sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        className="d-flex"
      >
        <NavItem to="/collections" className={({ isActive }) => (isActive ? 'active' : '')}>
          <CategoryIcon />
          Collections
        </NavItem>
        <NavItem to="/trending" className={({ isActive }) => (isActive ? 'active' : '')}>
          <TrendingUpIcon />
          Trending
        </NavItem>
        <NavItem to="/featured" className={({ isActive }) => (isActive ? 'active' : '')}>
          <NewReleases />
          Featured
        </NavItem>
        <NavItem to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
          <Phone />
          Contact
        </NavItem>
      </Paper>
    </Wrapper>
  );
}
