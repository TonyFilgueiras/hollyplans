import React from "react";
import styled from "styled-components";
import { Title } from "../styles/Title";
import { useNavigate, useParams } from "react-router-dom";
import useFetchPlans from "../hooks/useFetchPlans";
import IHolidayPlans from "../interfaces/IHolidayPlans";
import Button from "../components/Button";
import { ReturnButton } from "../styles/ReturnButton";
import { LuPencil } from "react-icons/lu";
import { device } from "../styles/Breakpoints";
import WarningModalContext from "../contexts/WarningModalContext";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import PdfDocument from "../PdfDocument";

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
  margin: 10px;
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
  font-family: ${({ theme }) => theme.fonts.appTheme};
  font-weight: bold;
  text-decoration: underline;
  text-decoration-style: wavy;
`;

const InfoContainer = styled.div`
  display: flex;
  padding: 20px;
  margin: 10px auto;
  font-size: clamp(1rem, 3vw, 2rem);
  max-width: 800px;

  @media (${device.sm}) {
    padding: 10px;
    margin: 5px 0;
  }
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
  const { setError } = React.useContext(WarningModalContext);

  React.useEffect(() => {
    const fetchPlan = async () => {
      try {
        if (id) {
          const planData = await getPlanById(id);
          if (!planData) {
            setError("Plan not found");
            navigate("/plans");
          }

          setPlan(planData);
        }
      } catch (err) {
        console.log(err);
        console.error("Error fetching plan:");
      }
    };
    fetchPlan();
  }, [getPlanById, id, navigate, setError]);

  function downloadPdf(planName: string) {
    const modifiedPlanName = planName.replace(" ", "_");
  
    // Get the HTML element to be converted to PDF
    const element = document.getElementById("plan-container");
  
    domtoimage
      .toPng(element! )
      .then(function (dataUrl) {
        // Create a new jsPDF instance
        const pdf = new jsPDF();
  
        // Add the image to the PDF
        pdf.addImage(dataUrl, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    
        // Save the PDF
        pdf.save(`${modifiedPlanName}_hollyPlan.pdf`);
      })
      .catch(function (error) {
        console.error("Error converting to image:", error);
      });
  }

  

  return (
    <ViewContainer>
      {plan && (
        <PlanContainer>
          <TitleHeader>
            <StyledReturnButton text="<" onClick={() => navigate(-1)} title="Return" />
            <StyledTitle>{plan.name}</StyledTitle>
            <StyledEditButton title="Edit" onClick={() => navigate(`/edit/${id}`)}>
              <LuPencil />
            </StyledEditButton>
          </TitleHeader>
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
            <StyledH2>Participants:</StyledH2> {plan.participants}
          </InfoContainer>
          <InfoContainer>
            <StyledH2>Activities:</StyledH2> {plan.activities.join(", ")}
          </InfoContainer>

          <Button text="Download Plan as pdf" onClick={() => downloadPdf(plan.name)} />
          <PdfDocument plan={plan}/>
        </PlanContainer>
      )}
    </ViewContainer>
  );
}
