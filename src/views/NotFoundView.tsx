import React from "react";
import styled from "styled-components";
import { Title } from "../styles/Title";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { PiSmileyXEyesFill } from "react-icons/pi";

const Container = styled.div`
  height: 70vh;
  max-width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  margin-top: 50px;
`;

const StyledTitle = styled.h1`
  ${Title({ animationDelay: 0 })}
`;

const IconContainer = styled.div`
  ${Title({ animationDelay: 1 })}
  font-size: clamp(6rem, 20vw, 12rem);
`;

const StyledButton = styled(Button)`
  margin: auto;
  width: 90%;
  max-width: 300px;
`;

const NotFoundView = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <StyledTitle>Oops! Page Not Found</StyledTitle>
      <StyledTitle>Sorry, the page you are looking for does not exist.</StyledTitle>
      <IconContainer>
        <PiSmileyXEyesFill />
      </IconContainer>
      <StyledButton text="Go to home page" onClick={() => navigate("/")} />
    </Container>
  );
};

export default NotFoundView;
