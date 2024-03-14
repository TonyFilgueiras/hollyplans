import React from "react";
import styled, { css } from "styled-components";
import Fadein from "../styles/animations/FadeIn";

type Props = {
  tags: { [name: string]: string[] };
  index: number;
  inputName: string;
  inputPlaceholder: string;
  handleKeyDown: (inputName: string, e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeTag: (inputName: string, index: number) => void;
};

const StyledTagsContainer = styled.div<{ $animationDelay: number }>`
  opacity: 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5em;
  animation: ${Fadein} 2s forwards;
  `;

const TagItem = styled.div<{ $animationDelay: number }>`
  opacity: 0;
  background-color: ${({ theme }) => theme.colors.blue};
  display: inline-block;
  padding: 0.5em 0.75em;
  border-radius: 20px;
  font-family: ${({ theme }) => theme.fonts.standard};
  
  animation: ${Fadein} 2s forwards;
  ${(props) => css`
    animation-delay: ${props.$animationDelay};
  `}

  
  .close {
    height: 20px;
    width: 20px;
    background-color: ${({ theme }) => theme.colors.pink};
    color: #fff;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.5em;
    font-size: 18px;
    cursor: pointer;
  }
  `;

const TagInput = styled.input<{ $animationDelay: number }>`
  margin: 0 auto 10px auto;
  opacity: 0;
  width: 90%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  animation: ${Fadein} 2s forwards;
  ${(props) => css`
    animation-delay: ${props.$animationDelay}s;
  `}
`;

export default function TagsContainer({ index, tags, inputName, inputPlaceholder, handleKeyDown, removeTag }: Props) {
  return (
    <StyledTagsContainer $animationDelay={(index + 1) / 2} key={index}>
      {tags[inputName].map((tag, tagIndex) => (
        <TagItem $animationDelay={((index + 1) / 2) + tagIndex + 33} key={tagIndex}>
          <span>{tag}</span>
          <span className="close" onClick={() => removeTag(inputName, tagIndex)}>
            x
          </span>
        </TagItem>
      ))}
      <TagInput $animationDelay={(index + 1) / 2} onKeyDown={(e) => handleKeyDown(inputName, e)} type="text" placeholder={inputPlaceholder} />
    </StyledTagsContainer>
  );
}
