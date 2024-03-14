import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { device } from "../styles/Breakpoints";

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.yellow};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: relative;
  z-index: 99;
  overflow: hidden;
  @media (${device.sm}) {
    padding: 10px;
  }
`;
const AppName = styled.h1`
  color: ${({ theme }) => theme.colors.skyBlue};
  font-size: clamp(10px, 5vw, 2rem);
  font-family: ${({ theme }) => theme.fonts.appTheme};
  padding: 20px;

  @media (${device.sm}) {
    padding: 0;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  font-size: clamp(10px, 2vw, 0.9rem);

  @media (${device.sm}) {
    letter-spacing: 0.1px;
    padding: 10px;
  }
`;

export default function Header() {
  const { loggedIn, userLogout } = React.useContext(UserContext);

  return (
    <StyledHeader>
      <Link to="/">
        <AppName>HollyPlans</AppName>
      </Link>
      {!loggedIn ? (
        <ButtonsContainer>
          <Link to="/register">
            <StyledButton text="Sign up" negative />
          </Link>
          <Link to="/login">
            <StyledButton text="Login" />
          </Link>
        </ButtonsContainer>
      ) : (
        <>
          <StyledButton text="Log out" onClick={userLogout} />
        </>
      )}
    </StyledHeader>
  );
}
