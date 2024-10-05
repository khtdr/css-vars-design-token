
# Table of Contents

1.  [CssVarsDesignToken Documentation](#org7e39fb5)
    1.  [Introduction](#orgf38be16)
    2.  [Installation](#orgb7e15c8)
    3.  [Usage](#org9f89772)
    4.  [Example 1: Simple Usage](#org94b85ab)
    5.  [Example 2: Nested DesignToken Usage](#org8162a6c)
2.  [Test and code coverage reports](#orgab75920)
3.  [Development & Contributing](#org0b991d2)



<a id="org7e39fb5"></a>

# CssVarsDesignToken Documentation

*Much of this documentation was machine generated, suggestions welcome.* 🙏

CssVarsDesignToken simplifies theme management in React applications by leveraging CSS variables and providing hooks for theme selection. By following the provided guidelines, you can easily integrate design tokens and themes into your components for consistent styling.


<a id="orgf38be16"></a>

## Introduction

CssVarsDesignToken is a TypeScript library designed to manage design tokens and themes using CSS variables in React applications. This documentation provides an overview of how to use CssVarsDesignToken in your projects.

Define dark and light themes however you like.

``` javascript
    const themes= {
        light: {
            color: { bg: '#fff', fg: '#333' },
            layout: { margin: 10 }
        },
        dark: {
            color: { bg: '#333', fg: '#fff' },
            layout: { margin: 20 }
        }
    }
```

Wrap your app in a `CssVarsDesignTokenProvider`

``` javascript
    import { CssVarsDesignTokenProvider, useCssTheme } from 'css-vars-design-token';
    
    const App = () =>
        <CssVarsDesignTokenProvider themes={themes}>
            <Components />
        </CssVarsDesignTokenProvider>
    
    function Components() {
        const { theme, toggle } = useCssTheme();
        return (
            <div>
                Current Theme: <strong>{theme}</strong>
    
                <button onClick={toggle}>Toggle Theme</button>
            </div>
        );
    }
```

And use CSS Variables wherever you like. The object keys are flattened and converted to CSS variables.

``` css
    .title h1 {
        color: var(--color-fg);
        background-color: var(--color-bg);
        margin: var(--layout-margin);
    }
```

``` html
    <div style={{ margin: "var(--layout-margin)" }}>
        Hello World
    </div>
```


<a id="orgb7e15c8"></a>

## Installation

To use CssVarsDesignToken in your project, you need to have installed the following peer dependencies:

-   `react` Any recent version will do.

Ensure that you have these dependencies included in your project.


<a id="org9f89772"></a>

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


<a id="org94b85ab"></a>

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
                dark: { primary: '#fff', secondary: '#ccc' }
              }}
            >
              <App />
            </CssVarsDesignToken.CssVarsDesignTokenProvider>
          );
        </script>
      </body>
    </html>
```


<a id="org8162a6c"></a>

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
            margin: var(--layout-margin);
            background-color: var(--color-bg);
            color: var(--color-fg);
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
                  layout: { margin: 10 }
                },
                dark: {
                  color: { bg: '#333', fg: '#fff' },
                  layout: { margin: 20 }
                }
              }}
            >
              <NestedThemeComponent />
            </CssVarsDesignToken.CssVarsDesignTokenProvider>
          );
        </script>
      </body>
    </html>
```


<a id="orgab75920"></a>

# Test and code coverage reports

    
    > css-vars-design-token@1.0.2 test:coverage
    > jest --coverage
    
    (node:1168) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
    (Use `node --trace-deprecation ...` to show where the warning was created)
    PASS ./test.tsx
      Function toCssVars
        ✓ toCssVars returns the expected flat list of css vars (2 ms)
      React integrations
        ✓ Computed style matches the expectation from the token (13 ms)
        ✓ Computed style matches the other theme upon toggling (7 ms)
    
    ---------------------------|---------|----------|---------|---------|-------------------
    File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
    ---------------------------|---------|----------|---------|---------|-------------------
    All files                  |   85.29 |       40 |   85.71 |   83.87 |                   
     css-vars-design-token.tsx |   85.29 |       40 |   85.71 |   83.87 | 19,27,32-35,43    
    ---------------------------|---------|----------|---------|---------|-------------------
    Test Suites: 1 passed, 1 total
    Tests:       3 passed, 3 total
    Snapshots:   0 total
    Time:        1.402 s
    Ran all test suites.


<a id="org0b991d2"></a>

# Development & Contributing

There are additional dependencies for development:

-   `typescript` for auto-completion and type checking.
-   `jest` for testing.
-   `webpack` for bundling the project.
-   `eslint` and `prettier` for linting and formatting.
-   `http-server` for running the demo locally.
-   `org-mode` for generating documentation.

The following npm scripts are available for development:

-   `npm test`: Run Jest for testing.
-   `npm run build`: Build the project using Webpack in production mode.
-   `npm run clean`: Remove the `dist` and `coverage` directories.
-   `npm run demo`: Start a local server to view the demo at <http://localhost:8080/demo.html>.
-   `npm run lint`: Lint the project using ESLint.
-   `npm run format`: Format the TypeScript and JSX files using Prettier.
-   `npm run test:watch`: Watch mode for running Jest tests.
-   `npm run test:coverage`: Run Jest with test coverage reporting.

If you want to contribute to this project, please follow these guidelines:

1.  Fork the repository on [GitHub](<https://github.com/khtdr/css-vars-design-token>).
2.  Clone your forked repository locally.
3.  Make your changes in a feature branch.
4.  Write tests for your changes if applicable.
5.  Update the documentation as needed.
6.  Submit a pull request to the `main` branch.
7.  Provide a clear description of the changes you made in your pull request.

Thank you for contributing to this project!

