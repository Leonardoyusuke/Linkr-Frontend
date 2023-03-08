import React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <LoadingStyled>
      <ReactLoading
        type={"bars"}
        color={"#171717"}
        max-height={"50px"}
        height={"20%"}
        max-width={"50px"}
        width={"20%"}
      />
    </LoadingStyled>
  );
}

const LoadingStyled = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
