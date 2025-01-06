import * as React from 'react';
import { act, render } from '@testing-library/react';
import {
  toCssVars,
  useCssVarsDesignTokenContext,
  CssVarsDesignTokenProvider,
  __internal__,
} from './css-vars-design-token';

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
      const { token } = useCssVarsDesignTokenContext<TestThemeToken>();
      return <div data-testid="token-name">{token.name}</div>;
    };

    const { getByTestId } = render(
      <CssVarsDesignTokenProvider themes={themes}>
        <TestComponent />
      </CssVarsDesignTokenProvider>,
    );
    expect(getByTestId('token-name').textContent).toBe(LIGHT_THEME.name);
  });

  test('Computed style matches the other theme upon toggling', () => {
    const themes = {
      dark: DARK_THEME,
      light: LIGHT_THEME,
    };

    const TestComponent = () => {
      const { token, toggle } = useCssVarsDesignTokenContext<TestThemeToken>();

      return (
        <>
          <div data-testid="token-name">{token.name}</div>
          <button onClick={() => act(() => toggle())}>Light Theme</button>
        </>
      );
    };

    const { getByTestId, getByText } = render(
      <CssVarsDesignTokenProvider themes={themes} theme="dark">
        <TestComponent />
      </CssVarsDesignTokenProvider>,
    );

    expect(getByTestId('token-name').textContent).toBe(DARK_THEME.name);
    getByText('Light Theme').click();
    expect(getByTestId('token-name').textContent).toBe(LIGHT_THEME.name);
  });

  test('Token is modifiable and reflects modifications', () => {
    const themes = {
      light: { color1: 'blue', color2: 'red', header: 'var(--color1)' },
      dark: { color1: 'purple', color2: 'green', header: 'var(--color1)' },
    };

    const TestComponent = () => {
      const { token } = useCssVarsDesignTokenContext();
      return (
        <div>
          <div
            data-testid="token-header"
            style={{ backgroundColor: 'var(--header)' }}
          >{`${token.header}`}</div>
        </div>
      );
    };

    const { getByTestId } = render(
      <CssVarsDesignTokenProvider themes={themes}>
        <TestComponent />
      </CssVarsDesignTokenProvider>,
    );
    expect(getByTestId('token-header').textContent).toBe('var(--color1)');
  });
});

describe('Exported Functions', () => {
  test('`toCssVars` returns the expected flat list of css vars', () => {
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

describe('Internal functions', () => {
  test('Dotted notation lookup', () => {
    expect(__internal__.dottedLookup({ name: 'John Doe' }, 'name')).toBe(
      'John Doe',
    );
    expect(
      __internal__.dottedLookup(
        { customer: { name: 'John Doe' } },
        'customer.name',
      ),
    ).toBe('John Doe');
    expect(
      __internal__.dottedLookup({ customer: { name: 'John Doe' } }, 'customer'),
    ).toStrictEqual({
      name: 'John Doe',
    });
    expect(
      __internal__.dottedLookup(
        { customer: { name: 'John Doe' } },
        'customer.domain',
      ),
    ).toStrictEqual(undefined);
    expect(
      __internal__.dottedLookup(
        { customer: { name: 'John Doe' } },
        'customer.domain',
        'www.none.com',
      ),
    ).toStrictEqual('www.none.com');
  });
  test('Dotted notation updating', () => {
    expect(
      __internal__.dottedSetter({ name: 'John Doe' }, 'name', 'Jane Doe'),
    ).toStrictEqual({ name: 'Jane Doe' });
    expect(
      __internal__.dottedSetter(
        { customer: { name: 'John Doe' } },
        'customer.name',
        'Jane Doe',
      ),
    ).toStrictEqual({ customer: { name: 'Jane Doe' } });
    expect(
      __internal__.dottedSetter(
        { leads: { customer: { name: 'John Doe' } } },
        'leads.customer.name',
        'Jane Doe',
      ),
    ).toStrictEqual({ leads: { customer: { name: 'Jane Doe' } } });
    expect(
      __internal__.dottedSetter({}, 'leads.customer.name', 'Jane Doe'),
    ).toStrictEqual({ leads: { customer: { name: 'Jane Doe' } } });

    // Updates reference
    const ref = { leads: { customer: { name: 'John Doe' } } };
    __internal__.dottedSetter(ref, 'leads.customer.name', 'Jane Doe');
    expect(ref).toStrictEqual({ leads: { customer: { name: 'Jane Doe' } } });
  });
});
