
# Table of Contents

1.  [CssVarsDesignToken Documentation](#org4549448)
    1.  [Introduction](#org5f54850)
    2.  [Installation](#org09dd917)
    3.  [Usage](#orge7dd55e)
    4.  [Example 1: Simple Usage](#org27bc945)
    5.  [Example 2: Nested DesignToken Usage](#orgcd2a6b4)
2.  [Contributing](#org0615791)
3.  [Test and code coverage reports](#org0105c1c)



<a id="org4549448"></a>

# CssVarsDesignToken Documentation

*Much of this documentation was machine generated, suggestions welcome.* 🙏

CssVarsDesignToken simplifies theme management in React applications by leveraging CSS variables and providing hooks for theme customization. By following the provided guidelines, you can easily integrate design tokens and themes into your components for consistent styling.


<a id="org5f54850"></a>

## Introduction

CssVarsDesignToken is a TypeScript library designed to manage design tokens and themes using CSS variables in React applications. This documentation provides an overview of how to use CssVarsDesignToken in your projects.


<a id="org09dd917"></a>

## Installation

To use CssVarsDesignToken in your project, you need to install the following dependencies:

-   react
-   react-dom

Ensure that you have these dependencies included in your project. The specific version shouldn&rsquo;t matter.


<a id="orge7dd55e"></a>

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


<a id="org27bc945"></a>

## Example 1: Simple Usage

Here is a simple example demonstrating the usage of CssVarsDesignToken with basic theming:

``` html
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
```


<a id="orgcd2a6b4"></a>

## Example 2: Nested DesignToken Usage

Here is an example demonstrating the nested nature of DesignToken for more complex theming:

``` html
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
```


<a id="org0615791"></a>

# Contributing

If you want to contribute to this project, please follow these guidelines:

1.  Fork the repository on [GitHub](<https://github.com/khtdr/css-vars-design-token>).
2.  Clone your forked repository locally.
3.  Make your changes in a feature branch.
4.  Write tests for your changes if applicable.
5.  Run the following NPM scripts:
    -   \`npm test\`: Run Jest for testing.
    -   \`npm run build\`: Build the project using Webpack in production mode.
    -   \`npm run clean\`: Remove the \`dist\` and \`coverage\` directories.
    -   \`npm run demo\`: Start a local server to view the demo at <http://localhost:8080/demo.html>.
    -   \`npm run lint\`: Lint the project using ESLint.
    -   \`npm run format\`: Format the TypeScript and JSX files using Prettier.
    -   \`npm run test:watch\`: Watch mode for running Jest tests.
    -   \`npm run test:coverage\`: Run Jest with test coverage reporting.
6.  Submit a pull request to the \`main\` branch.
7.  Provide a clear description of the changes you made in your pull request.

Thank you for contributing to this project!


<a id="org0105c1c"></a>

# Test and code coverage reports

    
    > css-vars-design-token@1.0.1 test:coverage
    > jest --coverage
    
    PASS ./test.tsx
      Function toCssVars
        ✓ toCssVars returns the expected flat list of css vars (1 ms)
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

    Ran all test suites.

