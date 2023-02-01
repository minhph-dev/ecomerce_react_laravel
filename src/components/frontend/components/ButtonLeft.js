import React from "react";
import styled from "styled-components";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const StyledWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
  .icon {
    font-size: 40px;
  }
`;
export default function ButtonLeft({ onClick }) {
  return (
    <StyledWrapper onClick={onClick}>
      <ArrowCircleLeftIcon className="icon" />
    </StyledWrapper>
  );
}
