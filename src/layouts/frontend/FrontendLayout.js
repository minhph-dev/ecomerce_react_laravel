import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../layouts/frontend/Navbar";
import styled from "styled-components";
import Footer from "./Footer";
import { useState } from "react";
import { WrapperContext } from "./../../context/WrapperContext";
import { Box } from "@mui/material";
import axios from "axios";
import NavMobile from "./NavMobile";

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
  const [logged, setLogged] = useState(false);
  const [setting, setSetting] = useState({});

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/settings`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setSetting(res.data.setting);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [setSetting]);

  return (
    <WrapperContext.Provider value={{ logged, setLogged, setting, setSetting }}>
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
    </WrapperContext.Provider>
  );
};

export default FrontendLayout;
