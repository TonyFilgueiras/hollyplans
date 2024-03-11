import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.yellow};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: relative;
  z-index: 99;
`;
const AppName = styled.h1`
  color: ${({ theme }) => theme.colors.skyBlue};
  font-size: 2rem;
  font-family: ${({ theme }) => theme.fonts.appTheme};
  padding: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
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
            <Button text="Sign up" negative />
          </Link>
          <Link to="/login">
            <Button text="Login" />
          </Link>
        </ButtonsContainer>
      ) : (
        <><Button text="Log out" onClick={userLogout} /></>
      )}
    </StyledHeader>
  );
}
