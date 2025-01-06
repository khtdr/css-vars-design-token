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
export declare function useCssVarsDesignTokenContext<Token extends DesignToken>(): CssVarsDesignTokenContextType & {
    token: Token;
};
export declare const CssVarsDesignTokenProvider: ({ children, themes, theme: initial, style, }: React.PropsWithChildren<{
    themes: CssVarsDesignTokenContextType["themes"];
    theme?: Theme;
    style?: React.CSSProperties;
}>) => React.JSX.Element;
export declare function toCssVars(obj: DesignToken, parentKey?: string): Record<string, string | number>;
declare function dottedSetter(object: DesignToken, path: string, value: number | string): DesignToken;
declare function dottedLookup(object: DesignToken, path: string, defaultValue?: number | string): string | number | DesignToken;
export declare const __internal__: {
    dottedLookup: typeof dottedLookup;
    dottedSetter: typeof dottedSetter;
};
export {};
