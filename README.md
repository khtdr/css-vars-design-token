
# Table of Contents

1.  [CssVars Documentation](#org066b639)
    1.  [Introduction](#org2946dcc)
    2.  [Installation](#orgdbb2017)
    3.  [Usage](#orgd5f68de)
    4.  [Example 1: Simple Usage](#orgaf55f6d)
    5.  [Example 2: Nested DesignToken Usage](#orgabd739c)



<a id="org066b639"></a>

# CssVars Documentation

CssVars simplifies theme management in React applications by leveraging CSS variables and providing hooks for theme customization. By following the provided guidelines, you can easily integrate design tokens and themes into your components for consistent styling.


<a id="org2946dcc"></a>

## Introduction

CssVars is a TypeScript library designed to manage design tokens and themes using CSS variables in React applications. This documentation provides an overview of how to use CssVars in your projects.


<a id="orgdbb2017"></a>

## Installation

To use CssVars in your project, you need to install the following dependencies:

-   React
-   react-dom

Ensure that you have these dependencies included in your project.


<a id="orgd5f68de"></a>

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


<a id="orgaf55f6d"></a>

## Example 1: Simple Usage

Here is a simple example demonstrating the usage of CssVars with basic theming:

    <!doctype html>
    <html lang="en">
      <head>
        <!-- Include necessary scripts -->
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="/node_modules/react/umd/react.production.min.js"></script>
        <script src="/node_modules/react-dom/umd/react-dom.production.min.js"></script>
        <script src="/dist/bundle.js"></script>
    
        <!-- Define CSS variables -->
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
          // Import required CssVars functions
          const { useCssTheme } = CssVars;
    
          // Define a React component using useCssTheme
          function App() {
            const { toggle } = useCssTheme();
            return (
              <div>
                <h1>CssVars &amp; Design Token</h1>
                <button onClick={toggle}>Toggle Theme</button>
              </div>
            );
          }
    
          // Render the App component within CssVarsProvider
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


<a id="orgabd739c"></a>

## Example 2: Nested DesignToken Usage

Here is an example demonstrating the nested nature of DesignToken for more complex theming:

    <!doctype html>
    <html lang="en">
      <head>
        <!-- Include necessary scripts -->
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="/node_modules/react/umd/react.production.min.js"></script>
        <script src="/node_modules/react-dom/umd/react-dom.production.min.js"></script>
        <script src="/dist/bundle.js"></script>
    
        <!-- Define CSS variables -->
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
> jest &#x2013;coverage

(node:91632) [DEP0040] DeprecationWarning: The \`punycode\` module is deprecated. Please use a userland alternative instead.
(Use \`node &#x2013;trace-deprecation &#x2026;\` to show where the warning was created)
PASS ./test.tsx
  Function toCssVars
    ✓ toCssVars returns the expected flat list of css vars (1 ms)
  React integrations
    ✓ Computed style matches the expectation from the token (12 ms)
    ✓ Computed style matches the other theme upon toggling (8 ms)

----------------------&#x2013;&#x2014;|----&#x2013;&#x2014;|-----&#x2013;&#x2014;|----&#x2013;&#x2014;|----&#x2013;&#x2014;|--------------&#x2013;&#x2014;
File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------&#x2013;&#x2014;|----&#x2013;&#x2014;|-----&#x2013;&#x2014;|----&#x2013;&#x2014;|----&#x2013;&#x2014;|--------------&#x2013;&#x2014;
All files                  |   85.29 |       40 |   85.71 |   83.87 |                   
 css-vars-design-token.tsx |   85.29 |       40 |   85.71 |   83.87 | 19,27,32-35,43    
----------------------&#x2013;&#x2014;|----&#x2013;&#x2014;|-----&#x2013;&#x2014;|----&#x2013;&#x2014;|----&#x2013;&#x2014;|--------------&#x2013;&#x2014;
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.07 s
Ran all test suites.

