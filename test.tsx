import * as React from 'react';
import { act, render } from '@testing-library/react';
import {
  CssVarsProvider,
  useDesignToken,
  useThemeMode,
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

type TestModeToken = { name: string };
const LIGHT_MODE: TestModeToken = { name: 'light-mode' };
const DARK_MODE: TestModeToken = { name: 'dark-mode' };

describe('React integrations', () => {
  test('Computed style matches the expectation from the token', () => {
    const modes = {
      dark: DARK_MODE,
      light: LIGHT_MODE,
    };

    const TestComponent = () => {
      const token = useDesignToken<TestModeToken>();
      return <div data-testid="token-name">{token.name}</div>;
    };

    const { getByTestId } = render(
      <CssVarsProvider modes={modes}>
        <TestComponent />
      </CssVarsProvider>,
    );
    expect(getByTestId('token-name').textContent).toBe(DARK_MODE.name);
  });

  test('Computed style matches the other mode upon toggling', () => {
    const modes = {
      dark: DARK_MODE,
      light: LIGHT_MODE,
    };

    const TestComponent = () => {
      const token = useDesignToken<TestModeToken>();
      const { setMode } = useThemeMode();

      return (
        <>
          <div data-testid="token-name">{token.name}</div>
          <button
            onClick={() => {
              act(() => {
                setMode('light');
              });
            }}
          >
            Light Mode
          </button>
        </>
      );
    };

    const { getByTestId, getByText } = render(
      <CssVarsProvider modes={modes}>
        <TestComponent />
      </CssVarsProvider>,
    );

    expect(getByTestId('token-name').textContent).toBe(DARK_MODE.name);
    getByText('Light Mode').click();
    expect(getByTestId('token-name').textContent).toBe(LIGHT_MODE.name);
  });
});
