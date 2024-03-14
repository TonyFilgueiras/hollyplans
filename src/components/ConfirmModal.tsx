import React from "react";
import ConfirmModalContext from "../contexts/ConfirmModalContext";
import Button from "./Button";
import styled from "styled-components";

type Props = {
  onConfirm: () => void;
  modalTitle: string;
  modalSubTitle?: string;
};

const ModalContainer = styled.div<{ $isOpened?: boolean }>`
  padding: 20px;
  border-radius: 10px;
  min-width: 200px;
  min-height: 100px;
  position: fixed;
  top: 40%;
  left: 50%;
  transform-origin: center center;
  transform: translate(-50%, -50%);
  z-index: 999;
  font-family: ${({ theme }) => theme.fonts.title};
  background-color: ${({ theme }) => theme.colors.blue};
  box-shadow: 0px 0px 100px 100px #00000088;
  transition: 0.5s;

  &.containerHidden {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
    transform-origin: center;
  }
`;

const StyledH1 = styled.h1`
  font-size: clamp(10px, 4vw, 2rem);
  margin-bottom: 20px;
`;
const StyledH2 = styled.h2`
  font-size: clamp(7px, 3vw, 1rem);
  margin-bottom: 5px;
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.pink};
  color: white;
`;
const ConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.green};
`;

export default function ConfirmModal({ onConfirm, modalTitle, modalSubTitle }: Props) {
  const { isOpen, closeModal } = React.useContext(ConfirmModalContext);

  function handleConfirm() {
    onConfirm();
    closeModal();
  }

  return (
    <ModalContainer className={isOpen ? "" : "containerHidden"} $isOpened={true}>
      <StyledH1>{modalTitle}</StyledH1>
      <StyledH2>{modalSubTitle}</StyledH2>
      <CancelButton negative text="No" onClick={closeModal} />
      <ConfirmButton text="Yes" onClick={handleConfirm} />
    </ModalContainer>
  );
}
