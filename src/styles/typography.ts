import { css } from '@linaria/core';

css`
  :global() {
    :root {
      font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      font-weight: 400;
      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;
    }
    a {
      font-weight: 500;
    }
    h1 {
      font-size: 3.2em;
      line-height: 1.1;
    }
    button {
      border-radius: 8px;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
    }
  }
`;
