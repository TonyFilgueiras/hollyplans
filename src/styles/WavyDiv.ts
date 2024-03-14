import { css } from "styled-components";

interface Props {
  borderColor: string;
  backgroundColor: string;
}

export const wavyDiv = ({ borderColor, backgroundColor }: Props) => css`
  /* height: 200px; */
  background: linear-gradient(${backgroundColor}, transparent 80%),
    radial-gradient(154.4px at 50% calc(100% - 212px), ${borderColor} 99%, #0000 101%) calc(50% - 160px) 0/320px 100%,
    radial-gradient(154.4px at 50% calc(100% + 132px), #0000 99%, ${borderColor} 101%) 50% calc(100% - 80px) / 320px 100% repeat-x;
`;
