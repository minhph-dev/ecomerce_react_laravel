import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Outlet } from "react-router-dom";
import Navbar from "../../layouts/frontend/Navbar";
import styled from "styled-components";
import Footer from "./Footer";
import { Box } from "@mui/material";
import NavMobile from "./NavMobile";
import AuthProvider from "../../context/AuthProvider";

const WrapperNav = styled.div`
  top: 0;
  z-index: 10;
  background-color: white;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  height: 112px;
`;

const WrapperContent = styled.div`
  margin-top: 112px;
`;

const FrontendLayout = () => {
  return (
    <AuthProvider>
      <Box className="w-100 h-100">
        <WrapperNav className="w-100 position-fixed">
          <Navbar />
        </WrapperNav>
        <WrapperContent className="d-flex flex-column w-100">
          <Box>
            <Outlet />
          </Box>
          <Box className="mt-5">
            <Footer />
          </Box>
          <Box className="d-md-none d-flex">
            <NavMobile />
          </Box>
        </WrapperContent>
      </Box>
    </AuthProvider>
  );
};

export default FrontendLayout;
