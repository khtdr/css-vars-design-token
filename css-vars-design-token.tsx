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
        context.setTheme(
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light',
        );
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
  style,
}: React.PropsWithChildren<{
  themes: CssVarsDesignTokenContextType['themes'];
  style?: React.CSSProperties;
}>) => {
  type Theme = keyof typeof themes;
  const [theme, setTheme] = React.useState(Object.keys(themes)[0] as Theme);
  const token: DesignToken =
    themes[theme] || themes[Object.keys(themes)[0] as Theme];
  const value = {
    themes,
    token,
    theme,
    setTheme,
  } as CssVarsDesignTokenContextType;
  return (
    <CssVarsDesignTokenContext.Provider value={value}>
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
