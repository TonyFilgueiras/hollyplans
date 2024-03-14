import React from "react";
import styled from "styled-components";
import IHolidayPlans from "./interfaces/IHolidayPlans";
import { Title } from "./styles/Title";
import { theme } from "./styles/Theme";

type Props = {
  plan: IHolidayPlans;
};

const ViewContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.skyBlue};
  color: ${({ theme }) => theme.colors.blue};
  height: 628px;
  padding-bottom: 20px;
  position: fixed;
  left: -0px;
  top: 0;
`;

const StyledTitle = styled.h1`
  ${Title({ animationDelay: 0 })}
  font-size: 2rem;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.appTheme};
  font-weight: bold;
  text-decoration: underline;
  text-decoration-style: wavy;
`;
const AppIcon = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  width: 50px;
`;

const InfoContainer = styled.div`
  display: flex;
  padding: 20px;
  margin: 10px auto;
  font-size: 2rem;
  width: 800px;
`;
const DescriptionContainer = styled(InfoContainer)`
  max-height: 300px;
  overflow: auto;
  display: flex;
`;

const StyledH2 = styled.h2`
  font-weight: bold;
  width: 30%;
  margin-right: 10px;
  text-align: start;
`;

const PlanContainer = styled.div`
  background: linear-gradient(${({theme})=> theme.colors.beige},#fff 40%);
  border: 2px solid ${({ theme }) => theme.colors.blue};
  border-left-width: 5px;
  border-right-width: 5px;
  transform: scale(00.1);
  animation: scaleAnimation 1s forwards;

  @keyframes scaleAnimation {
    from {
      transform: scale(0.1);
    }
    to {
      transform: scale(1);
    }
  }
`;

export default function PdfDocument({ plan }: Props) {
  const pdfContainer = React.useRef(null as HTMLDivElement | null);

  console.log(pdfContainer);

  return (
    <ViewContainer ref={pdfContainer}>
      {plan && (
        <PlanContainer id="plan-container">
          <StyledTitle>{plan.name}</StyledTitle>
          <AppIcon src="/favicon-32x32.png" />

          <DescriptionContainer>
            <StyledH2>Description:</StyledH2> {plan.description}
          </DescriptionContainer>
          <InfoContainer>
            <StyledH2>Location:</StyledH2> {plan.location}
          </InfoContainer>
          <InfoContainer>
            <StyledH2>End Date:</StyledH2> {plan.endDate}
          </InfoContainer>
          <InfoContainer>
            <StyledH2>Start Date:</StyledH2> {plan.startDate}
          </InfoContainer>
          <InfoContainer>
            <StyledH2>Participants:</StyledH2> {plan.participants.join(", ")}
          </InfoContainer>
          <InfoContainer>
            <StyledH2>Activities:</StyledH2> {plan.activities.join(", ")}
          </InfoContainer>
        </PlanContainer>
      )}
    </ViewContainer>
  );
}
