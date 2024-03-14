import React from "react";
import styled, { css } from "styled-components";
import ModalContext from "../contexts/ModalContext";
import Dropdown from "../styles/animations/Dropdown";

const Styleddiv = styled.div<{ $isOpened?: boolean }>`
  padding: 20px;
  border-radius: 10px;
  min-width: 200px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 999;
  opacity: 0;
  font-family: ${({ theme }) => theme.fonts.title};

  ${(props) =>
    !props.$isOpened &&
    css`
      display: block;
    `}

  ${(props) =>
    props.$isOpened &&
    css`
      opacity: 1;
      animation: ${Dropdown} 0.5s forwards;
    `}
`;

const ErrorModal = styled(Styleddiv)`
  background-color: ${({ theme }) => theme.colors.pink};
`;

const SuccessModal = styled(Styleddiv)`
  background-color: ${({ theme }) => theme.colors.green};
`;

export default function Modal() {
  const { isOpen, error, success } = React.useContext(ModalContext);
  return (
    <>
      {error && <ErrorModal $isOpened={isOpen}>Error: {error}</ErrorModal>}
      {success && <SuccessModal $isOpened={isOpen}>{success}</SuccessModal>}
    </>
  );
}
