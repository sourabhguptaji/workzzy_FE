import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #fff;
    color: #333;
  }

  h2 {
    margin-bottom: 2rem;
    color: #111;
  }
`;

export default GlobalStyle;
