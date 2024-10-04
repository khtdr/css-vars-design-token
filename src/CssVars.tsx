import * as React from 'react';

interface DesignToken {
  [key: string]: string | number | DesignToken;
}

type CssVarsContextType = {
  mode: 'dark' | 'light';
  modes: Record<'dark' | 'light', DesignToken>;
  token: DesignToken;
  setMode: (mode: 'dark' | 'light') => void;
};

const CssVarsContext = React.createContext({} as CssVarsContextType);

export const useDesignToken = () => {
  const context = React.useContext(CssVarsContext);
  if (!context) {
    throw new Error('useDesignToken must be used within a CssVarsProvider');
  }
  return context.token;
};

export const useThemeMode = () => {
  const context = React.useContext(CssVarsContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a CssVarsProvider');
  }
  const setMode = React.useCallback(
    (mode: 'dark' | 'light' | 'auto') => {
      if (mode === 'auto') {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches;
        context.setMode(prefersDark ? 'dark' : 'light');
      } else {
        context.setMode(mode);
      }
    },
    [context.setMode],
  );
  return { mode: context.mode, setMode };
};

export const CssVarsProvider = ({
  children,
  modes,
  style,
}: React.PropsWithChildren<{
  modes: CssVarsContextType['modes'];
  style?: React.CSSProperties;
}>) => {
  type Mode = keyof typeof modes;
  const [mode, setMode] = React.useState(Object.keys(modes)[0] as Mode);
  const token: DesignToken =
    modes[mode] || modes[Object.keys(modes)[0] as Mode];
  const value = { modes, token, mode, setMode } as CssVarsContextType;
  return (
    <CssVarsContext.Provider value={value}>
      <div
        style={{
          height: 'inherit',
          width: 'inherit',
          ...flattenToken(token),
          ...style,
        }}
      >
        {children}
      </div>
    </CssVarsContext.Provider>
  );
};

function flattenToken(
  obj: DesignToken,
  parentKey: string = '-',
): Record<string, string | number> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const prefixedKey = parentKey ? `${parentKey}-${key}` : key;
      if (typeof obj[key] === 'object') {
        Object.assign(acc, flattenToken(obj[key] as DesignToken, prefixedKey));
      } else {
        acc[prefixedKey] = obj[key] as string | number;
      }
      return acc;
    },
    {} as Record<string, string | number>,
  );
}
