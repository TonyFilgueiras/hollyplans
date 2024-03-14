import React from "react";
import styled from "styled-components";
import { Title } from "../styles/Title";
import { useNavigate, useParams } from "react-router-dom";
import useFetchPlans from "../hooks/useFetchPlans";
import IHolidayPlans from "../interfaces/IHolidayPlans";
import Button from "../components/Button";
import { ReturnButton } from "../styles/ReturnButton";
import { LuPencil } from "react-icons/lu";

const ViewContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.skyBlue};
  color: ${({ theme }) => theme.colors.blue};
  min-height: 100vh;
  padding-bottom: 20px;
`;

const TitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: auto;
`;

const StyledReturnButton = styled(Button)`
  ${ReturnButton}
  background-color: ${({ theme }) => theme.colors.skyBlue};
`;

const StyledEditButton = styled.div`
  ${ReturnButton}
  transition: all.2s;
  color: ${({ theme }) => theme.colors.blue};
  line-height: 57px;
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.colors.skyBlue};

  &:hover {
    filter: brightness(1.1);
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const StyledTitle = styled.h1`
  ${Title({ animationDelay: 0 })}
  text-transform: uppercase;
`;

const PlanContainer = styled.div`
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

export default function PlanView() {
  const { id } = useParams();
  const [plan, setPlan] = React.useState<IHolidayPlans>();
  const { getPlanById } = useFetchPlans();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchPlan = async () => {
      try {
        if (id) {
          const planData = await getPlanById(id);

          setPlan(planData);
        }
      } catch (err) {
        console.log(err);
        console.error("Error fetching plan:");
      }
    };

    fetchPlan();
  }, [getPlanById, id]);

  return (
    <ViewContainer>
      {plan && (
        <PlanContainer>
          <TitleHeader>
            <StyledReturnButton text="<" onClick={() => navigate(-1)} title="Return" />
            <StyledTitle>{plan.name}</StyledTitle>
            <StyledEditButton title="Edit">
              <LuPencil />
            </StyledEditButton>
          </TitleHeader>
          <StyledTitle>Activities: {plan.activities.join(", ")}</StyledTitle>
          <StyledTitle>Description: {plan.description}</StyledTitle>
          <StyledTitle>End Date: {plan.endDate}</StyledTitle>
          <StyledTitle>Location: {plan.location}</StyledTitle>
          <StyledTitle>Participants: {plan.participants.join(", ")}</StyledTitle>
          <StyledTitle>Start Date: {plan.startDate}</StyledTitle>

          <Button text="Download Plan as pdf" />
        </PlanContainer>
      )}
    </ViewContainer>
  );
}
