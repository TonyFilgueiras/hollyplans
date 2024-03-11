import React from "react";
import { MdSearchOff } from "react-icons/md";
import styled from "styled-components";

interface NoPlansFoundProps {
  carta: string;
}

const NoPlansFoundContainer = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  top: 55%;
  text-align: center;
`;

const StyledH1 = styled.h1`
  font-size: 1.5rem;
`;

const StyledIcon = styled(MdSearchOff)`
  font-size: 10rem;
`;

export default function NoPlansFound({ carta }: NoPlansFoundProps) {
  return (
    <NoPlansFoundContainer>
      <StyledIcon />
      <StyledH1>Nenhum {carta} encontrado</StyledH1>
    </NoPlansFoundContainer>
  );
}
