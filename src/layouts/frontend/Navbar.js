import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import styled from "styled-components";
import { Typography, Tooltip, Grid, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import Badge from "@mui/material/Badge";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoginIcon from "@mui/icons-material/Login";
import { WrapperContext } from "../../context/WrapperContext";
import { tablet } from "../../reponsive";
import { useRef } from "react";

const Wrapper = styled(Grid)`
  padding: 0 7.5%;
  ${tablet({ padding: "0 2% !important" })}
`;

const SearchWrapper = styled(Grid)`
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 999px;
  &:focus-within {
    border: 1px solid black;
  }
`;
const StyledInput = styled.input`
  border-radius: 999px;
  height: 40px;
  border: none;
  outline: none;
`;

const StyledIconButton = styled(IconButton)`
  background-color: #f3f5f9 !important;
  margin-left: 10px !important;
`;

const StyledProfile = styled.div`
  width: 150px;
  position: absolute;
  right: 0;
  top: 50px;
  flex-direction: column;
  background: #fff;
  display: none;
  border: 1px solid #ccc;
`;

const StyledProfileItem = styled(Link)`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #333;
  &:hover {
    background-color: #f3f5f9 !important;
  }
`;

const LinkItem = styled(Link)`
  margin-left: 30px;
  text-decoration: none;
  color: #333;
`;

function Navbar() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const { logged, setLogged, setting } = useContext(WrapperContext);

  useEffect(() => {
    if (sessionStorage.getItem("auth_token")) {
      setLogged(true);
    }
  }, [setLogged]);

  const logoutSubmit = (e) => {
    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        sessionStorage.removeItem("auth_token");
        sessionStorage.removeItem("auth_name");
        setLogged(false);
        swal("Success", res.data.message, "success");
        navigate("/");
      }
    });
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  const handleKeyPress = (e) => {
    const searchValue = e.target.value;
    if (e.key === "Enter" && searchValue !== "") {
      setSearchValue(searchValue);
      navigate(`/search/${searchValue}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <Wrapper>
      <Grid
        container
        className="d-flex align-items-center justify-content-between mt-3"
      >
        <Grid item xs={2} sm={3}>
          <Link to="/" className="text-decoration-none fw-bold">
            <Typography variant="h5" className="ps-2">
              {setting.wedsite_name ?? "ECOMERCE"}
            </Typography>
          </Link>
        </Grid>
        <SearchWrapper
          item
          xs={0}
          sm={6}
          className="align-items-center justify-content-center p-0 d-none d-md-flex"
        >
          <Link
            to={searchValue !== "" ? `/search/${searchValue}` : "#"}
            className="ms-3"
          >
            <SearchIcon />
          </Link>
          <StyledInput
            placeholder="Searching for..."
            className="h-100 w-100 ps-3"
            value={searchValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </SearchWrapper>
        <Grid item xs={10} sm={3} className="d-flex justify-content-end">
          <Tooltip title="WishList" arrow>
            <Link to="/wishlist">
              <StyledIconButton color="primary">
                <FavoriteBorderIcon color="action" />
              </StyledIconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Cart" arrow>
            <Link to="/cart">
              <StyledIconButton color="primary">
                <Badge color="primary">
                  <ShoppingBagOutlinedIcon color="action" />
                </Badge>
              </StyledIconButton>
            </Link>
          </Tooltip>
          {logged ? (
            <Box className="position-relative" sx={{ zIndex: "10" }}>
              <Tooltip
                title=""
                arrow
                onClick={() => {
                  setOpenProfile(!openProfile);
                }}
              >
                <StyledIconButton ref={ref}>
                  <Person2OutlinedIcon />
                </StyledIconButton>
              </Tooltip>
              <StyledProfile className={openProfile && "d-block"}>
                <StyledProfileItem to="/profile">My Profile</StyledProfileItem>
                <StyledProfileItem to="/orders">My Order</StyledProfileItem>
                <StyledProfileItem to="#" onClick={logoutSubmit}>Logout</StyledProfileItem>
              </StyledProfile>
            </Box>
          ) : (
            <Tooltip title="Login" arrow>
              <Link to="/login">
                <StyledIconButton>
                  <LoginIcon />
                </StyledIconButton>
              </Link>
            </Tooltip>
          )}
        </Grid>
      </Grid>

      <Grid
        container
        className="d-flex align-items-center justify-content-center py-md-3 pt-2 pb-4"
      >
        <SearchWrapper
          item
          xs={12}
          sm={8}
          className="align-items-center justify-content-center p-0 d-md-none d-flex"
        >
          <Link
            to={searchValue !== "" ? `/search/${searchValue}` : "#"}
            className="ms-3"
          >
            <SearchIcon />
          </Link>
          <StyledInput
            placeholder="Searching for..."
            className="h-100 w-100 ps-3"
            value={searchValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </SearchWrapper>
        <Grid
          item
          xs={0}
          sm={12}
          className="justify-content-end d-none d-md-flex"
        >
          <LinkItem to={"/"}>Home</LinkItem>
          <LinkItem to={"/collections"}>Collections</LinkItem>
          <LinkItem to={"/trending"}>Trending Product</LinkItem>
          <LinkItem to={"/featured"}>Featured Product</LinkItem>
          <LinkItem to={"/contact"}>Contact</LinkItem>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Navbar;
