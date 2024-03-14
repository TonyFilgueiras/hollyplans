import { css } from "styled-components";

export const ReturnButton = css`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.blue};
  border-radius: 50px;
  height: 50px;
  width: 50px;
  font-size: 2rem;
  padding: 0px;
`;
