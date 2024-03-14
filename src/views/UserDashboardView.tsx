import React from "react";
import styled, { css } from "styled-components";
import useFetchPlans from "../hooks/useFetchPlans";
import NoPlansFound from "../components/NoPlansfound";
import Loading from "../components/Loading";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Title } from "../styles/Title";
import Fadein from "../styles/animations/FadeIn";
import Button from "../components/Button";
// import { StyledInput } from "../components/FormComponent";

const StyledTitle = styled.h1`
  ${Title({ animationDelay: 0 })}
`;
const DashboardContainer = styled.div`
  padding: 20px;
`;

const PlansCardContainer = styled.div`
  max-width: 80vw;
  height: 70vh;
  margin: auto;
  overflow: auto;


  &.overflowRemoved{
    overflow: visible;
  }
`;

// const FilterBox = styled.div`
//   border: 1px solid yellow;

// `

const CreatePlanButton = styled(Button)`
  opacity: 0;
  position: relative;
  transform: translateX(-50%);
  top: 0px;
  left: 38vw;
  margin: 15px;
  animation: ${Fadein} 2s forwards;

  &:active {
    transform: translateX(-50%) scale(0.95);
  }
`;

const PlanCard = styled.div<{ $animationDelay: number }>`
  opacity: 0;
  max-width: 78vw;
  color: ${({ theme }) => theme.colors.blue};
  border-radius: 10px;
  height: 100px;
  background: linear-gradient(
    170deg,
    ${({ theme }) => theme.colors.skyBlue} 40%,
    ${({ theme }) => theme.colors.beige} 50%,
    ${({ theme }) => theme.colors.brown} 100%
  );
  background-size: 400%;
  background-position: center;
  position: relative;
  box-shadow: 0 0 10px 0px #00000088;
  cursor: pointer;
  transition: 0.5s ease;
  font-family: ${({ theme }) => theme.fonts.standard};
  font-weight: bold;
  margin: 20px auto;
  animation: ${Fadein} 2s forwards;
  ${(props) => css`
    animation-delay: ${props.$animationDelay}s;
  `}

  &:hover {
    transform: scale(0.98);
    background-position: -50vw;
  }
  &.clicked {
    transform: scale(19.6);
    background: ${({ theme }) => theme.colors.skyBlue};
  }
  &.notClicked {
    transform: scale(0.01);
    opacity: 0;
  }

  & span {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`;

const DescriptionContainer = styled.h2`
  margin: 15px auto 0 auto;
  max-width: 70vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &.clicked {
    color: ${({theme})=> theme.colors.skyBlue};
  }
`;

const CardName = styled(StyledTitle)`
  padding: 10px;
  margin: 0;
  font-weight: normal;
  &.clicked {
    color: ${({theme})=> theme.colors.skyBlue};
  }
`;

export default function UserDashboardView() {
  const { plans, loading, getPlans } = useFetchPlans();
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [clickedPlanId, setClickedPlanId] = React.useState("");
  const [notClickedPlanId, setNotClickedPlanId] = React.useState<string[]>([]);
  const [overflowRemoved, setOverflowRemoved] = React.useState(false);

  const handleClick = (planId: string) => {
    setClickedPlanId(planId);
    setOverflowRemoved(true)
    
    const otherPlanIds = plans.map((plan) => plan.id).filter((id) => id !== planId);

    setNotClickedPlanId(otherPlanIds);
    setTimeout(() => {
      navigate(`/plans/${planId}`);
    }, 500);
  };

  React.useEffect(() => {
    getPlans();
    console.log(plans)
  }, [getPlans]);

  return (
    <DashboardContainer>
      <StyledTitle>My HollyPlans</StyledTitle>
      {/* <FilterBox>
        <StyledInput $animationDelay={2}/>
      </FilterBox> */}
      {loading ? (
        <Loading />
      ) : plans.length > 0 ? (
        <PlansCardContainer className={overflowRemoved ? "overflowRemoved" : ""}>
          <CreatePlanButton text="Create new plan" onClick={() => navigate("/newplan")} />
          {plans
            .filter((plan) => plan.user === user?.username)
            .map((plan, index) => (
              <PlanCard
                key={plan.id}
                className={plan.id === clickedPlanId ? "clicked" : notClickedPlanId.includes(plan.id) ? "notClicked" : ""}
                onClick={() => handleClick(plan.id)}
                $animationDelay={(index + 1) / 2}
              >
                <CardName className={plan.id === clickedPlanId ? "clicked" : notClickedPlanId.includes(plan.id) ? "notClicked" : ""}>
                  {plan.name}
                </CardName>
                {plan.description && <DescriptionContainer className={plan.id === clickedPlanId ? "clicked" : notClickedPlanId.includes(plan.id) ? "notClicked" : ""}>{plan.description}</DescriptionContainer>}
                {plan.location && <span>{plan.location}</span>}
              </PlanCard>
            ))}
        </PlansCardContainer>
      ) : (
        <NoPlansFound carta="produto/serviço" />
      )}
    </DashboardContainer>
  );
}
