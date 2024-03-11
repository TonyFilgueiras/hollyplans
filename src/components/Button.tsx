import React from "react";
import styled, { css } from "styled-components";

type Props = {
  text?: string;
  negative?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // Include HTML button props

export const StyledButton = styled.button<{ $negative?: boolean }>`
  margin: 0 10px;
  padding: 10px 20px;
  font-style: ${({ theme }) => theme.fonts.standard};
  text-transform: uppercase;
  letter-spacing: 3px;

  ${(props) =>
    props.$negative
      ? css`
          background-color: white;
          color: ${({ theme }) => theme.colors.brown};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.brown};
          color: white;
        `}
  &:hover {
    filter: brightness(1.1);
    cursor: pointer;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Button = ({ text, negative, ...rest }: Props) => { // Spread other props
  return <StyledButton $negative={negative} {...rest}>{text}</StyledButton>;
};

export default Button;
