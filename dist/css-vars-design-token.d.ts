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
export declare const useDesignToken: <Token extends DesignToken>() => Token;
export declare const useCssTheme: () => {
    theme: "dark" | "light";
    setTheme: (theme: "dark" | "light" | "auto") => void;
    toggle: () => void;
};
export declare const CssVarsProvider: ({ children, themes, style, }: React.PropsWithChildren<{
    themes: CssVarsContextType["themes"];
    style?: React.CSSProperties;
}>) => React.JSX.Element;
export declare function toCssVars(obj: DesignToken, parentKey?: string): Record<string, string | number>;
export {};
