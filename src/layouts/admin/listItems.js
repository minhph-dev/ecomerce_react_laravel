import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCardIcon from "@mui/icons-material/AddCard";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ColorizeOutlinedIcon from "@mui/icons-material/ColorizeOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

export const mainListItems = (
  <React.Fragment>
    <StyledLink to="/admin/dashboard">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </StyledLink>

    <StyledLink to="/admin/orders">
      <ListItemButton>
        <ListItemIcon>
          <BookmarkBorderIcon />
        </ListItemIcon>
        <ListItemText primary="Order" />
      </ListItemButton>
    </StyledLink>

    <StyledLink to="/admin/view-category">
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Category" />
      </ListItemButton>
    </StyledLink>

    <StyledLink to="/admin/view-brand">
      <ListItemButton>
        <ListItemIcon>
          <AddCardIcon />
        </ListItemIcon>
        <ListItemText primary="Brand" />
      </ListItemButton>
    </StyledLink>

    <StyledLink to="/admin/view-color">
      <ListItemButton>
        <ListItemIcon>
          <ColorizeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Color" />
      </ListItemButton>
    </StyledLink>

    <StyledLink to="/admin/view-product">
      <ListItemButton>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Product" />
      </ListItemButton>
    </StyledLink>

    <StyledLink to="/admin/view-banner">
      <ListItemButton>
        <ListItemIcon>
          <AddPhotoAlternateIcon />
        </ListItemIcon>
        <ListItemText primary="Banner" />
      </ListItemButton>
    </StyledLink>

    <StyledLink to="/admin/view-user">
      <ListItemButton>
        <ListItemIcon>
          <PersonAddAltIcon />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItemButton>
    </StyledLink>

    <StyledLink to="/admin/settings">
      <ListItemButton>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
      </ListItemButton>
    </StyledLink>

    <StyledLink to="/">
      <ListItemButton>
        <ListItemIcon>
          <ReplyAllIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </StyledLink>
  </React.Fragment>
);
