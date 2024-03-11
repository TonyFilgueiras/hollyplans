import React from "react";
import styled from "styled-components";
import { wavyDiv } from "../styles/WavyDiv";
import { theme } from "../styles/Theme";
import Dropdown from "../styles/animations/Dropdown";
import Fadein from "../styles/animations/FadeIn";
import { StyledButton } from "../components/Button";
import Carousel from "../components/Carousel";
import { Title } from "../styles/Title";

const HomeViewContainer = styled.div`
text-align: center;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  width: 100vw;
  height: 200px;
  ${wavyDiv({ borderColor: theme.colors.blue, backgroundColor: theme.colors.skyBlue })};
  animation: ${Dropdown} 1s forwards ease-out;
  z-index: -1;
`;

const StyledTitle = styled.h1`
  ${Title({animationDelay: 1})}
`;

const SubTitle = styled(StyledTitle)`
  padding: 70px;
  font-size: 1.5rem;
  animation-delay: 2s;
`;

const HomeViewButton = styled(StyledButton)`
  opacity: 0;
  padding: 20px 40px;
  animation: ${Fadein} 2s forwards;
  animation-delay: 3s;
  width: 300px;
  margin: auto;
`;

export default function HomeView() {
  return (
    <HomeViewContainer>
      <TitleContainer>
        <StyledTitle>Plan for your holidays</StyledTitle>
        <SubTitle>Organize your vacation in a few clicks.</SubTitle>
      </TitleContainer>
      <Carousel slides={["Schedule your trips", "Calculate your costs", "Pick your participants", "Plan your activities"]} />
      <HomeViewButton $negative={false} onClick={() => console.log("Button clicked")}>
        Get Started →
      </HomeViewButton>
    </HomeViewContainer>
  );
}
