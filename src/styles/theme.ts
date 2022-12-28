import { css } from '@linaria/core';
import OpenColor from 'open-color';

const ThemeToken = Object.freeze({
  Background: '--bg',
  Foreground: '--fg',
  RecordButton: '--record',
});
type ThemeToken = typeof ThemeToken[keyof typeof ThemeToken];
export const ThemeVars = Object.freeze(
  Object.fromEntries(
    Object.entries(ThemeToken).map(([k, v]) => [k, `var(${v})`] as const),
  ),
) as {
  [K in keyof typeof ThemeToken]: `var(${typeof ThemeToken[K]})`;
};

function define(name: ThemeToken, dark: string, light: string): string;
function define(name: ThemeToken, color: string): string;
function define(name: ThemeToken, arg0: string, arg1?: string): string {
  if (arg1) {
    return `
      @media (prefers-color-scheme: dark) {
        :root:not(.light) {
          ${name}: ${arg0};
        }
      }
      :root.dark {
        ${name}: ${arg0};
      }

      @media (prefers-color-scheme: light) {
        :root:not(.dark) {
          ${name}: ${arg1};
        }
      }
      :root.light {
        ${name}: ${arg1};
      }
    `;
  } else {
    return `
      :root {
        ${name}: ${arg0};
      }
    `;
  }
}

css`
  :global() {
    :root {
      color-scheme: light dark;
    }
    ${define(ThemeToken.Background, OpenColor.gray[8], OpenColor.gray[1])}
    ${define(ThemeToken.Foreground, OpenColor.gray[1], OpenColor.gray[8])}
    ${define(ThemeToken.RecordButton, OpenColor.red[8])}
  }
`;
