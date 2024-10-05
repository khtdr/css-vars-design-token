
# Table of Contents

1.  [CssVars Documentation](#org98cf74e)
    1.  [Introduction](#org64ababa)
    2.  [Installation](#orgcf63232)
    3.  [Usage](#orge45cb4d)
    4.  [Example 1: Simple Usage](#org515047b)
    5.  [Example 2: Nested DesignToken Usage](#org5a0e469)



<a id="org98cf74e"></a>

# CssVars Documentation

CssVars simplifies theme management in React applications by leveraging CSS variables and providing hooks for theme customization. By following the provided guidelines, you can easily integrate design tokens and themes into your components for consistent styling.


<a id="org64ababa"></a>

## Introduction

CssVars is a TypeScript library designed to manage design tokens and themes using CSS variables in React applications. This documentation provides an overview of how to use CssVars in your projects.


<a id="orgcf63232"></a>

## Installation

To use CssVars in your project, you need to install the following dependencies:

-   React
-   react-dom

Ensure that you have these dependencies included in your project.


<a id="orge45cb4d"></a>

## Usage

1.  ****CssVarsProvider****
    -   The \`CssVarsProvider\` component is used to provide themes and design tokens to the components within its subtree.
    -   It accepts the following props:
        -   \`themes\`: An object containing theme configurations, where each key represents a theme name and the value is a DesignToken object.
        -   \`style\` (optional): Additional CSS styles to apply to the root element.

2.  ****useDesignToken****
    -   Custom hook to access design tokens from the context.
    -   Should be used within a component wrapped by \`CssVarsProvider\`.

3.  ****useCssTheme****
    -   Custom hook to manage themes and toggle between them.
    -   Should be used within a component wrapped by \`CssVarsProvider\`.

4.  ****toCssVars****
    -   Utility function to convert DesignToken objects into CSS variable format.


<a id="org515047b"></a>

## Example 1: Simple Usage

Here is a simple example demonstrating the usage of CssVars with basic theming:

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
          const { useCssTheme } = CssVars;
          function App() {
            const { toggle } = useCssTheme();
            return (
              <div>
                <h1>CssVars &amp; Design Token</h1>
                <button onClick={toggle}>Toggle Theme</button>
              </div>
            );
          }
          ReactDOM.createRoot(document.getElementById('root')).render(
            <CssVars.CssVarsProvider
              themes={{
                light: { primary: '#333', secondary: '#666' },
                dark: { primary: '#fff', secondary: '#ccc' },
              }}
            >
              <App />
            </CssVars.CssVarsProvider>,
          );
        </script>
      </body>
    </html>


<a id="org5a0e469"></a>

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
          const { useCssTheme } = CssVars;
          function NestedThemeComponent() {
            const { theme, toggle } = useCssTheme();
    
            return (
              <div>
                <h1>CssVars Nested Theme Example</h1>
                <p>Current Theme: {theme}</p>
                <button onClick={toggle}>Toggle Theme</button>
              </div>
            );
          }
          ReactDOM.createRoot(document.getElementById('root')).render(
            <CssVars.CssVarsProvider
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
            </CssVars.CssVarsProvider>,
          );
        </script>
      </body>
    </html>

    
    > css-vars-design-token@0.0.9 test:coverage
    > jest --coverage
    
    (node:92000) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
    (Use `node --trace-deprecation ...` to show where the warning was created)
    PASS ./test.tsx
      Function toCssVars
        ✓ toCssVars returns the expected flat list of css vars (1 ms)
      React integrations
        ✓ Computed style matches the expectation from the token (14 ms)
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
    Time:        1.081 s
    Ran all test suites.

