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
import { ReturnButton } from "../styles/ReturnButton";
import { RiDeleteBin5Fill } from "react-icons/ri";
import ConfirmModalContext from "../contexts/ConfirmModalContext";
import deletePlan from "../services/deletePlan";
import WarningModalContext from "../contexts/WarningModalContext";
import ConfirmModal from "../components/ConfirmModal";
import { device } from "../styles/Breakpoints";
import IHolidayPlans from "../interfaces/IHolidayPlans";
import { DocumentData } from "firebase/firestore";
// import { StyledInput } from "../components/FormComponent";

const StyledTitle = styled.h1`
  ${Title({ animationDelay: 0 })}
`;
const DashboardContainer = styled.div`
  padding: 20px;
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

const DeleteButton = styled.div`
  ${ReturnButton}
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: all.2s;
  color: white;
  background-color: ${({ theme }) => theme.colors.pink};
  line-height: 57px;
  font-size: 1.5rem;

  visibility: hidden;

  &:hover {
    filter: brightness(1.1);
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95) translateY(-50%);
  }
`;
const PlanCard = styled.div<{ $animationDelay: number }>`
  opacity: 0;
  max-width: 76vw;
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
  max-width: 50vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &.clicked {
    color: ${({ theme }) => theme.colors.skyBlue};
  }
`;

const CardName = styled(StyledTitle)`
  padding: 10px;
  margin: 0;
  font-weight: normal;
  &.clicked {
    color: ${({ theme }) => theme.colors.skyBlue};
  }
`;
const PlansCardContainer = styled.div`
  max-width: 80vw;
  height: 70vh;
  margin: auto;
  overflow: auto;

  ${PlanCard}:hover ${DeleteButton} {
    visibility: visible;
    opacity: 1;

    @media ${device.md} {
      visibility: hidden;
    }
  }

  &.overflowRemoved {
    overflow: visible;
  }
`;

export default function UserDashboardView() {
  const { plans, loading, getPlans } = useFetchPlans();
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [clickedPlanId, setClickedPlanId] = React.useState("");
  const [loadingText, setLoadingText] = React.useState("");
  const [deletingId, setDeletingId] = React.useState("");
  const [deletingName, setDeletingName] = React.useState("");
  const [notClickedPlanId, setNotClickedPlanId] = React.useState<string[]>([]);
  const [plansDisplayed, setPlansDisplayed] = React.useState<IHolidayPlans[] | DocumentData[]>([]);
  const [overflowRemoved, setOverflowRemoved] = React.useState(false);
  const { openConfirmModal } = React.useContext(ConfirmModalContext);
  const { setError, setSuccess } = React.useContext(WarningModalContext);

  const handleClick = (planId: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".deleteBtn")) {
      return;
    }
    setClickedPlanId(planId);
    setOverflowRemoved(true);

    const otherPlanIds = plans.map((plan) => plan.id).filter((id) => id !== planId);

    setNotClickedPlanId(otherPlanIds);
    setTimeout(() => {
      navigate(`/plans/${planId}`);
    }, 500);
  };

  function handleOpenModal(planId: string, planName: string) {
    setDeletingId(planId);
    setDeletingName(planName);
    openConfirmModal();
  }

  async function handleDeleteConfirmed(id: string) {
    setLoadingText("Deleting...");
    await deletePlan(id, setError, setSuccess);
    setLoadingText("Loading...");
    await getPlans();
    setLoadingText("");
    setPlansDisplayed(prevPlans => prevPlans.filter(plan => plan.id !== id));
    console.log(plans);
  }

  React.useEffect(() => {
    getPlans();
  }, [getPlans]);

  React.useEffect(() => {
    setPlansDisplayed(plans);
    console.log("nmaudoe?");
  }, [plans]);
  return (
    <DashboardContainer>
      <StyledTitle>My HollyPlans</StyledTitle>
      {/* <FilterBox>
        <StyledInput $animationDelay={2}/>
      </FilterBox> */}
      {loading || loadingText ? (
        <Loading text={loadingText ? loadingText : "Loading..."} />
      ) : plansDisplayed.length > 0 ? (
        <>
          <CreatePlanButton text="Create new plan" onClick={() => navigate("/newplan")} />
          <PlansCardContainer className={overflowRemoved ? "overflowRemoved" : ""}>
            {plansDisplayed
              .filter((plan) => plan.user === user?.username)
              .map((plan, index) => (
                <PlanCard
                  key={plan.id}
                  className={plan.id === clickedPlanId ? "clicked" : notClickedPlanId.includes(plan.id) ? "notClicked" : ""}
                  onClick={(e) => handleClick(plan.id, e)}
                  $animationDelay={(index + 1) / 2}
                >
                  <CardName className={plan.id === clickedPlanId ? "clicked" : notClickedPlanId.includes(plan.id) ? "notClicked" : ""}>
                    {plan.name}
                  </CardName>
                  {plan.description && (
                    <DescriptionContainer className={plan.id === clickedPlanId ? "clicked" : notClickedPlanId.includes(plan.id) ? "notClicked" : ""}>
                      {plan.description}
                    </DescriptionContainer>
                  )}
                  {plan.location && <span>{plan.location}</span>}
                  <DeleteButton onClick={() => handleOpenModal(plan.id, plan.name)} className="deleteBtn">
                    <RiDeleteBin5Fill />
                  </DeleteButton>
                </PlanCard>
              ))}
            <ConfirmModal
              onConfirm={() => handleDeleteConfirmed(deletingId)}
              modalTitle={`Delete ${deletingName}`}
              modalSubTitle={`are you sure you want to delete ${deletingName}`}
            />
          </PlansCardContainer>
        </>
      ) : (
        <NoPlansFound carta="produto/serviço" />
      )}
    </DashboardContainer>
  );
}
