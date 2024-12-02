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
export declare function useCssVarsDesignTokenContext<Token extends DesignToken>(): {
    theme: Theme;
    setTheme: (theme: Theme | "auto") => void;
    toggle: () => void;
    token: Token;
};
export declare const CssVarsDesignTokenProvider: ({ children, themes, theme: initial, style, }: React.PropsWithChildren<{
    themes: CssVarsDesignTokenContextType["themes"];
    theme?: Theme;
    style?: React.CSSProperties;
}>) => React.JSX.Element;
export declare function toCssVars(obj: DesignToken, parentKey?: string): Record<string, string | number>;
export {};
