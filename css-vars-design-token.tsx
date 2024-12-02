import * as React from 'react';

type Theme = 'dark' | 'light';

interface DesignToken {
  [key: string]: string | number | DesignToken;
}

type CssVarsDesignTokenContextType = {
  theme: Theme;
  themes: Record<Theme, DesignToken>;
  token: DesignToken;
  setTheme: (theme: Theme) => void;
};

const CssVarsDesignTokenContext = React.createContext(
  {} as CssVarsDesignTokenContextType,
);

export function useCssVarsDesignTokenContext<Token extends DesignToken>() {
  const context = React.useContext(CssVarsDesignTokenContext);
  if (!context)
    throw new Error(
      'useCssVarsDesignTokenContext must be used within a CssVarsDesignTokenProvider',
    );

  const setTheme = React.useCallback(
    (theme: Theme | 'auto') => {
      if (theme === 'auto') {
        context.setTheme(getPreferredTheme());
      } else {
        context.setTheme(theme);
      }
    },
    [context.setTheme],
  );
  const toggle = React.useCallback(() => {
    setTheme(context.theme === 'dark' ? 'light' : 'dark');
  }, [context.theme, setTheme]);
  return {
    theme: context.theme,
    setTheme,
    toggle,
    token: context.token as Token,
  };
}

export const CssVarsDesignTokenProvider = ({
  children,
  themes,
  theme: initial,
  style,
}: React.PropsWithChildren<{
  themes: CssVarsDesignTokenContextType['themes'];
  theme?: Theme;
  style?: React.CSSProperties;
}>) => {
  const [theme, setTheme] = React.useState(initial || getPreferredTheme());
  const token: DesignToken = themes[theme];
  return (
    <CssVarsDesignTokenContext.Provider
      value={{
        themes,
        token,
        theme,
        setTheme,
      }}
    >
      <div
        style={{
          height: 'inherit',
          width: 'inherit',
          ...toCssVars(token),
          ...style,
        }}
      >
        {children}
      </div>
    </CssVarsDesignTokenContext.Provider>
  );
};

export function toCssVars(
  obj: DesignToken,
  parentKey: string = '-',
): Record<string, string | number> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const prefixedKey = parentKey ? `${parentKey}-${key}` : key;
      if (typeof obj[key] === 'object') {
        Object.assign(acc, toCssVars(obj[key] as DesignToken, prefixedKey));
      } else {
        acc[prefixedKey] = obj[key] as string | number;
      }
      return acc;
    },
    {} as Record<string, string | number>,
  );
}

const getPreferredTheme = () => {
  const fn = window?.matchMedia;
  return fn && fn('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
