import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #09d3ac;
    --accent-color: #ff9800;
    --text-color: #9e9e9e;
    --text-dark-color: ${darken(0.2, '#9e9e9e')};
    --background-color: #282c34;
  }

  body {
    margin: 0;
    color: var(--text-color);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
      'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background-color);
  }

  .App {
    display: grid;
    grid-template-columns: 300px auto;
    grid-template-rows: auto 40px;
    grid-row-gap: 12px;
    grid-template-areas:
      "characters content"
      "characters footer";
    min-height: 100vh;
  }

  @media screen and (max-width: 776px) {
    .App {
      grid-template-columns: 1fr;
      grid-template-areas:
        "content"
        "footer";
    }

    .character-list-wrapper {
      display: none;
    }
  }

  a {
    color: var(--primary-color);
  }

  .character-container {
    grid-area: content;
    display: inline-grid;
    grid-template-columns: 75px auto 75px;

    .character-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
