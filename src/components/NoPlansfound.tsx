import React from "react";
import { MdSearchOff } from "react-icons/md";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface NoPlansFoundProps {
  carta: string;
}

const NoPlansFoundContainer = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  top: 55%;
  text-align: center;
  color: ${({theme})=> theme.colors.blue};
  `;

const StyledH1 = styled.h1`
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.standard};
  margin: 20px;
`;

const StyledIcon = styled(MdSearchOff)`
  font-size: 10rem;
`;

export default function NoPlansFound({ carta }: NoPlansFoundProps) {
  const navigate = useNavigate()

  return (
    <NoPlansFoundContainer>
      <StyledIcon />
      <StyledH1>Nenhum {carta} encontrado</StyledH1>
      <Button text="Create Plan" onClick={()=> navigate('/newplan')}></Button>
    </NoPlansFoundContainer>
  );
}
