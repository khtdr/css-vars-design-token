import * as React from 'react';
import { act, render } from '@testing-library/react';
import {
  CssVarsProvider,
  useDesignToken,
  useCssTheme,
  toCssVars,
} from './css-vars-design-token';

describe('Function toCssVars', () => {
  test('toCssVars returns the expected flat list of css vars', () => {
    const cssVars = toCssVars({
      g1: { s1: { v1: 1, v2: 1 }, s2: { v1: 1 } },
      g2: { s1: { v1: 1 }, s2: { v1: 1, v2: 1 } },
    });
    expect(cssVars).toEqual({
      '--g1-s1-v1': 1,
      '--g1-s1-v2': 1,
      '--g1-s2-v1': 1,
      '--g2-s1-v1': 1,
      '--g2-s2-v1': 1,
      '--g2-s2-v2': 1,
    });
  });
});

type TestThemeToken = { name: string };
const LIGHT_THEME: TestThemeToken = { name: 'light-theme' };
const DARK_THEME: TestThemeToken = { name: 'dark-theme' };

describe('React integrations', () => {
  test('Computed style matches the expectation from the token', () => {
    const themes = {
      dark: DARK_THEME,
      light: LIGHT_THEME,
    };

    const TestComponent = () => {
      const token = useDesignToken<TestThemeToken>();
      return <div data-testid="token-name">{token.name}</div>;
    };

    const { getByTestId } = render(
      <CssVarsProvider themes={themes}>
        <TestComponent />
      </CssVarsProvider>,
    );
    expect(getByTestId('token-name').textContent).toBe(DARK_THEME.name);
  });

  test('Computed style matches the other theme upon toggling', () => {
    const themes = {
      dark: DARK_THEME,
      light: LIGHT_THEME,
    };

    const TestComponent = () => {
      const token = useDesignToken<TestThemeToken>();
      const { setTheme } = useCssTheme();

      return (
        <>
          <div data-testid="token-name">{token.name}</div>
          <button
            onClick={() => {
              act(() => {
                setTheme('light');
              });
            }}
          >
            Light Theme
          </button>
        </>
      );
    };

    const { getByTestId, getByText } = render(
      <CssVarsProvider themes={themes}>
        <TestComponent />
      </CssVarsProvider>,
    );

    expect(getByTestId('token-name').textContent).toBe(DARK_THEME.name);
    getByText('Light Theme').click();
    expect(getByTestId('token-name').textContent).toBe(LIGHT_THEME.name);
  });
});
