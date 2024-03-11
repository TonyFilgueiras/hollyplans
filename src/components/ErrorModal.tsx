import React from 'react'
import styled, { css } from "styled-components"
import ErrorContext from '../contexts/ErrorContext'
import Dropdown from '../styles/animations/Dropdown'

const Styleddiv = styled.div<{ $isOpened?: boolean }>`
    background-color: ${({ theme }) => theme.colors.pink};
    padding: 20px;
    border-radius: 10px;
    min-width: 200px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%,0);
    z-index: 999;
    opacity: 0;
    font-family: ${({theme})=> theme.fonts.title};


    ${props => !props.$isOpened && css`
    display: block;
    `
    }

    ${props => props.$isOpened && css`
        opacity: 1;
        animation: ${Dropdown} 0.5s forwards;
        `}
    `

export default function ErrorModal() {
  const { isOpen, error } = React.useContext(ErrorContext)
  return (
    <Styleddiv $isOpened={isOpen} >Error: {error}</Styleddiv>
  )
}