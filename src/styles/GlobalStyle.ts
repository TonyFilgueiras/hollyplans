import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 8px;
    background-color: ${({ theme }) => theme.colors.beige};
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.blue};
    border-radius: 4px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.yellow};
  }
  body {
    margin: 0 auto;
    padding: 0;
    min-height: 100vh;
    background: linear-gradient(white, ${({ theme }) => theme.colors.beige});
    color: white;
    text-align: center;
    overflow-x: hidden;
    transition: all 2s ease;
  }
  a{
    color: white;
    text-decoration: none;
  }
  input{
    border: 0;
  }
  button{
    background-color: #00000000;
    border: 0;
    color: white;
    transition: .2s;
  }
`;

export default GlobalStyle;
