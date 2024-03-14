import React from "react";
import styled from "styled-components";
import { Title } from "../styles/Title";

type Props = {
  text?: string
}

const LoadingContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  padding: 20px 50px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 1px black;
`;
const StyledTitle = styled.h1`
  ${Title({ animationDelay: 0 })}
  color: white;
  padding: 20px;
`;

const LoadingBar = styled.div`
  background-color: ${({theme})=> theme.colors.pink};
  margin-top: 20px;
  width: 100%;
  height: 10px;
  border-radius: 53px;
  animation: loadingBar 1s ease-in-out infinite;
  @keyframes loadingBar {
    0% {
      transform: translateX(-130%);
    }
    100% {
      transform: translateX(130%);
    }
  }
`;

export default function Loading({text = "Loading"}:Props) {
  return (
    <LoadingContainer>
      <StyledTitle>{text}</StyledTitle>
      <LoadingBar/>
    </LoadingContainer>
  );
}