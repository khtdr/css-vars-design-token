import * as React from 'react';

interface DesignToken {
  [key: string]: string | number | DesignToken;
}

type CssVarsContextType = {
  theme: 'dark' | 'light';
  themes: Record<'dark' | 'light', DesignToken>;
  token: DesignToken;
  setTheme: (theme: 'dark' | 'light') => void;
};

const CssVarsContext = React.createContext({} as CssVarsContextType);

export const useDesignToken = <Token extends DesignToken>(): Token => {
  const context = React.useContext(CssVarsContext);
  if (!context) {
    throw new Error('useDesignToken must be used within a CssVarsProvider');
  }
  return context.token as Token;
};

export const useCssTheme = () => {
  const context = React.useContext(CssVarsContext);
  if (!context) {
    throw new Error('useCssTheme must be used within a CssVarsProvider');
  }
  const setTheme = React.useCallback(
    (theme: 'dark' | 'light' | 'auto') => {
      if (theme === 'auto') {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches;
        context.setTheme(prefersDark ? 'dark' : 'light');
      } else {
        context.setTheme(theme);
      }
    },
    [context.setTheme],
  );
  const toggle = React.useCallback(() => {
    setTheme(context.theme === 'dark' ? 'light' : 'dark');
  }, [context.theme, setTheme]);
  return { theme: context.theme, setTheme, toggle };
};

export const CssVarsProvider = ({
  children,
  themes,
  style,
}: React.PropsWithChildren<{
  themes: CssVarsContextType['themes'];
  style?: React.CSSProperties;
}>) => {
  type Theme = keyof typeof themes;
  const [theme, setTheme] = React.useState(Object.keys(themes)[0] as Theme);
  const token: DesignToken =
    themes[theme] || themes[Object.keys(themes)[0] as Theme];
  const value = { themes, token, theme, setTheme } as CssVarsContextType;
  return (
    <CssVarsContext.Provider value={value}>
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
    </CssVarsContext.Provider>
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
