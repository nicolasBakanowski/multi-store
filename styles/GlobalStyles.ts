import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Crimson Text';
    font-style: normal;
    font-weight: 400;
    src: local('Crimson Text Regular'), local('CrimsonText-Regular'),
         url('/fonts/CrimsonText-regular.woff2') format('woff2'),
         url('/fonts/CrimsonText-regular.woff') format('woff');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Regular'), local('Roboto-Regular'),
         url('/fonts/roboto.italic.woff2') format('woff2'),
         url('/fonts/roboto.italic.woff') format('woff');
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #7c0303;
    color: #FFFFFF;
    font-family: 'Roboto', Arial, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Crimson Text', serif;
  }

  /* Resto de tus estilos */
`;

export default GlobalStyles;
