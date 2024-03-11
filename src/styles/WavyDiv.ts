import { css} from "styled-components";

interface Props {
  borderColor: string;
  backgroundColor: string;
}

export const wavyDiv = ({ borderColor, backgroundColor }: Props) => css`
  background: linear-gradient(${backgroundColor}, transparent 80%),
    radial-gradient(7.72vw at 50% calc(100% - 10.6vw), ${borderColor} 99%, #0000 101%) calc(50% - 8vw) 0/16vw 100%,
    radial-gradient(7.72vw at 50% calc(100% + 6.6vw), #0000 99%, ${borderColor} 101%) 50% calc(100% - 4vw) / 16vw 100% repeat-x;
`;
