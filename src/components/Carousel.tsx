import React, { useState } from "react";
import styled from "styled-components";
import Fadein from "../styles/animations/FadeIn";

type Props = {
  slides: Array<string>;
};

const CarouselContainer = styled.div`
  opacity: 0;
  animation: ${Fadein} 2s forwards;
  animation-delay: 2.5s;
  height: 200px;
  width: 40vw;
  font-family: ${({ theme }) => theme.fonts.standard};
  font-weight: bold;
  margin: auto;
`;

const SlidesContainer = styled.div<{ currentslide: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  animation: ${Fadein} 3s forwards;
  color: ${({ theme }) => theme.colors.blue};
`;

const Slide = styled.div`
  font-size: 3rem;
`;

const CarouselButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.blue};
  height: 100px;
  font-size: 2rem;
  font-weight: bold;
`;

export default function Carousel({ slides }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <CarouselContainer>
      <SlidesContainer currentslide={currentSlide}>
        <CarouselButton onClick={prevSlide}>{"<"}</CarouselButton>
        <Slide>{slides[currentSlide]}</Slide>
        <CarouselButton onClick={nextSlide}>{">"}</CarouselButton>
      </SlidesContainer>
    </CarouselContainer>
  );
}
