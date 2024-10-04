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
export declare const useDesignToken: <Token extends DesignToken>() => Token;
export declare const useThemeMode: () => {
    mode: "dark" | "light";
    setMode: (mode: "dark" | "light" | "auto") => void;
};
export declare const CssVarsProvider: ({ children, modes, style, }: React.PropsWithChildren<{
    modes: CssVarsContextType["modes"];
    style?: React.CSSProperties;
}>) => React.JSX.Element;
export declare function toCssVars(obj: DesignToken, parentKey?: string): Record<string, string | number>;
export {};
