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
  toggle: () => void;
  mod: (name: string, value?: string | number) => void;
};

const CssVarsDesignTokenContext = React.createContext<
  CssVarsDesignTokenContextType | undefined
>(undefined);

export function useCssVarsDesignTokenContext<Token extends DesignToken>() {
  const context = React.useContext(CssVarsDesignTokenContext);
  if (!context) throw new Error('no context found for CssVarsDesignToken');
  return context as typeof context & { token: Token };
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
  const [theme, dispatchThemeSetter] = React.useState(
    initial || getPreferredTheme(),
  );

  const [mods, setMods] = React.useState<Record<string, string | number>>({});
  const token: DesignToken = React.useMemo(() => {
    const clone = JSON.parse(JSON.stringify(themes[theme]));
    Object.keys(mods).forEach((key) => {
      const modValue = mods[key];
      if (modValue !== undefined) dottedSetter(clone, key, mods[key]);
    });
    return clone;
  }, [themes, theme, mods]);

  const setTheme = React.useCallback(
    (theme: Theme | 'auto') =>
      dispatchThemeSetter(theme === 'auto' ? getPreferredTheme() : theme),
    [dispatchThemeSetter],
  );

  const toggle = React.useCallback(() => {
    dispatchThemeSetter(theme === 'dark' ? 'light' : 'dark');
  }, [theme, dispatchThemeSetter]);

  const mod = React.useCallback(
    (name: string, value: string | number | undefined) => {
      setMods((prev) => ({ ...prev, [name]: value }));
    },
    [setMods],
  );

  return (
    <CssVarsDesignTokenContext.Provider
      value={{
        themes,
        token,
        theme,
        toggle,
        setTheme,
        mod,
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

function dottedSetter(
  object: DesignToken,
  path: string,
  value: number | string,
) {
  const pathArray = Array.isArray(path) ? path : path.split('.');
  let currentObject = object;
  for (let i = 0; i < pathArray.length - 1; i++) {
    const key = pathArray[i];
    if (!currentObject.hasOwnProperty(key)) {
      currentObject[key] = {};
    }
    currentObject = currentObject[key] as DesignToken;
  }
  currentObject[pathArray[pathArray.length - 1]] = value;
  return object;
}

function dottedLookup(
  object: DesignToken,
  path: string,
  defaultValue: number | string = undefined,
) {
  const pathArray = Array.isArray(path) ? path : path.split('.');
  if (!object) return defaultValue;
  let currentObject: DesignToken | typeof defaultValue = object;
  for (let i = 0; i < pathArray.length; i++) {
    if (typeof currentObject !== 'object') return defaultValue;
    currentObject = currentObject[pathArray[i]] as typeof currentObject;
    if (currentObject === undefined) currentObject = defaultValue;
  }
  return currentObject;
}

const getPreferredTheme = () => {
  const fn = window?.matchMedia;
  return fn && fn('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const __internal__ = {
  dottedLookup,
  dottedSetter,
};
