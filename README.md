
# Table of Contents

1.  [CssVarsDesignToken Documentation](#orgdb82787)
    1.  [Introduction](#org1696f4e)
    2.  [Installation](#orgf810ceb)
    3.  [Usage](#orgc03cb12)
    4.  [Example 1: Simple Usage](#orgd360c27)
    5.  [Example 2: Nested DesignToken Usage](#orgeb668bc)



<a id="orgdb82787"></a>

# CssVarsDesignToken Documentation

CssVarsDesignToken simplifies theme management in React applications by leveraging CSS variables and providing hooks for theme customization. By following the provided guidelines, you can easily integrate design tokens and themes into your components for consistent styling.


<a id="org1696f4e"></a>

## Introduction

CssVarsDesignToken is a TypeScript library designed to manage design tokens and themes using CSS variables in React applications. This documentation provides an overview of how to use CssVarsDesignToken in your projects.


<a id="orgf810ceb"></a>

## Installation

To use CssVarsDesignToken in your project, you need to install the following dependencies:

-   react
-   react-dom

Ensure that you have these dependencies included in your project. The specific version shouldn&rsquo;t matter.


<a id="orgc03cb12"></a>

## Usage

1.  ****CssVarsDesignTokenProvider****
    -   The `CssVarsDesignTokenProvider` component is used to provide themes and design tokens to the components within its subtree.
    -   It accepts the following props:
        -   `themes`: An object containing theme configurations, where each key represents a theme name and the value is a DesignToken object.
        -   `style` (optional): Additional CSS styles to apply to the root element.

2.  ****useDesignToken****
    -   Custom hook to access design tokens from the context.
    -   Should be used within a component wrapped by `CssVarsDesignTokenProvider`.

3.  ****useCssTheme****
    -   Custom hook to manage themes and toggle between them.
    -   Should be used within a component wrapped by `CssVarsDesignTokenProvider`.

4.  ****toCssVarsDesignToken****
    -   Utility function to convert DesignToken objects into CSS variable format.


<a id="orgd360c27"></a>

## Example 1: Simple Usage

Here is a simple example demonstrating the usage of CssVarsDesignToken with basic theming:

    <!doctype html>
    <html lang="en">
      <head>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="/node_modules/react/umd/react.production.min.js"></script>
        <script src="/node_modules/react-dom/umd/react-dom.production.min.js"></script>
        <script src="/dist/bundle.js"></script>
        <style>
          * {
            background-color: var(--primary);
            color: var(--secondary);
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          const { useCssTheme } = CssVarsDesignToken;
          function App() {
            const { toggle } = useCssTheme();
            return (
              <div>
                <h1>CSS Vars & Design Token -- Simple Usage</h1>
                <button onClick={toggle}>Toggle Theme</button>
              </div>
            );
          }
          ReactDOM.createRoot(document.getElementById('root')).render(
            <CssVarsDesignToken.CssVarsDesignTokenProvider
              themes={{
                light: { primary: '#333', secondary: '#666' },
                dark: { primary: '#fff', secondary: '#ccc' },
              }}
            >
              <App />
            </CssVarsDesignToken.CssVarsDesignTokenProvider>,
          );
        </script>
      </body>
    </html>


<a id="orgeb668bc"></a>

## Example 2: Nested DesignToken Usage

Here is an example demonstrating the nested nature of DesignToken for more complex theming:

    <!doctype html>
    <html lang="en">
      <head>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="/node_modules/react/umd/react.production.min.js"></script>
        <script src="/node_modules/react-dom/umd/react-dom.production.min.js"></script>
        <script src="/dist/bundle.js"></script>
        <style>
          body {
            margin: var(--layout-margin, 20px);
            background-color: var(--color-bg, #f0f0f0);
            color: var(--color-fg, #333);
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          const { useCssTheme } = CssVarsDesignToken;
          function NestedThemeComponent() {
            const { theme, toggle } = useCssTheme();
    
            return (
              <div>
                <h1>CSS Vars & Design Token -- Nested Theme Example</h1>
                <p>Current Theme: {theme}</p>
                <button onClick={toggle}>Toggle Theme</button>
              </div>
            );
          }
          ReactDOM.createRoot(document.getElementById('root')).render(
            <CssVarsDesignToken.CssVarsDesignTokenProvider
              themes={{
                light: {
                  color: { bg: '#fff', fg: '#333' },
                  layout: { margin: 10 },
                },
                dark: {
                  color: { bg: '#333', fg: '#fff' },
                  layout: { margin: 20 },
                },
              }}
            >
              <NestedThemeComponent />
            </CssVarsDesignToken.CssVarsDesignTokenProvider>,
          );
        </script>
      </body>
    </html>

    
    > css-vars-design-token@0.0.9 test:coverage
    > jest --coverage
    
    (node:92464) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
    (Use `node --trace-deprecation ...` to show where the warning was created)
    PASS ./test.tsx
      Function toCssVars
        ✓ toCssVars returns the expected flat list of css vars (2 ms)
      React integrations
        ✓ Computed style matches the expectation from the token (12 ms)
        ✓ Computed style matches the other theme upon toggling (8 ms)
    
    ---------------------------|---------|----------|---------|---------|-------------------
    File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
    ---------------------------|---------|----------|---------|---------|-------------------
    All files                  |   85.29 |       40 |   85.71 |   83.87 |                   
     css-vars-design-token.tsx |   85.29 |       40 |   85.71 |   83.87 | 19,27,32-35,43    
    ---------------------------|---------|----------|---------|---------|-------------------
    Test Suites: 1 passed, 1 total
    Tests:       3 passed, 3 total
    Snapshots:   0 total
    Time:        1.071 s
    Ran all test suites.

