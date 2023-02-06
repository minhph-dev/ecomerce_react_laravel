import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function Page403() {
  return (
    <Wrapper className="position-fixed">
      <img
        height={150}
        src="https://miro.medium.com/max/1200/1*MIrLuyiCDpdNbnFYxYlKtA.png"
        alt=""
      />
      <div className="d-flex justify-content-center">
        <Button
          variant="contained"
          color="error"
          className="text-capitalize mt-3"
        >
          <Link className="text-white text-decoration-none" to="/">
            Go To Home
          </Link>
        </Button>
      </div>
    </Wrapper>
  );
}

export default Page403;
