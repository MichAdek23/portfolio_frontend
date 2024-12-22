import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all 0.3s ease; /* Smooth transition for theme change */
  }

  body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease; /* Smooth color transition for links */
  }

  a:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
  }

  button {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    cursor: pointer;
    padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  input, textarea {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    padding: ${({ theme }) => theme.spacing(1)};
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: border-color 0.3s ease;

    &:focus {
      border-color: ${({ theme }) => theme.colors.secondary};
      outline: none;
    }
  }

  /* Styling for headers and sections */
  header, section {
    padding: ${({ theme }) => theme.spacing(3)} 0;
    margin: ${({ theme }) => theme.spacing(2)} 0;
  }

  /* Disable user-select for specific elements to improve UI */
  *::selection {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export default GlobalStyles;
