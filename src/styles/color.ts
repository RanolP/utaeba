import { css } from '@linaria/core';
import { ThemeVars } from './theme';

css`
  :global() {
    :root {
      background: ${ThemeVars.Background};
      color: ${ThemeVars.Foreground};
    }
  }
`;
