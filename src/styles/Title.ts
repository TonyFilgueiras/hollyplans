import { css } from "styled-components";
import { theme } from "./Theme";
import Fadein from "./animations/FadeIn";

interface Props {
  animationDelay: number
}

export const Title  = ({ animationDelay}: Props) => css`
opacity: 0;
color: ${({ theme }) => theme.colors.blue};
font-size: clamp(20px, 5vw, 2rem);
font-family: ${theme.fonts.title};
color: ${theme.colors.blue};

animation: ${Fadein} 2s forwards;
animation-delay: ${animationDelay}s;
padding: 30px;
`;