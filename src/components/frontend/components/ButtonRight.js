import React from "react";
import styled from "styled-components";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const StyledWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
  .icon {
    font-size: 40px;
  }
`;
export default function ButtonRight({ onClick }) {
  return (
    <StyledWrapper onClick={onClick}>
      <ArrowCircleRightIcon className="icon" />
    </StyledWrapper>
  );
}
