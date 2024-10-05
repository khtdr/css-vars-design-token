
# Table of Contents

1.  [CssVarsDesignToken Documentation](#org09f3485)
    1.  [Introduction](#org0f7d35f)
    2.  [Installation](#org9641ebe)
    3.  [Usage](#orga72bd89)
    4.  [Example 1: Simple Usage](#org6d81a42)
    5.  [Example 2: Nested DesignToken Usage](#org9c6ace2)
    6.  [Test and code coverage reports](#orgcca2a21)



<a id="org09f3485"></a>

# CssVarsDesignToken Documentation

CssVarsDesignToken simplifies theme management in React applications by leveraging CSS variables and providing hooks for theme customization. By following the provided guidelines, you can easily integrate design tokens and themes into your components for consistent styling.


<a id="org0f7d35f"></a>

## Introduction

CssVarsDesignToken is a TypeScript library designed to manage design tokens and themes using CSS variables in React applications. This documentation provides an overview of how to use CssVarsDesignToken in your projects.


<a id="org9641ebe"></a>

## Installation

To use CssVarsDesignToken in your project, you need to install the following dependencies:

-   react
-   react-dom

Ensure that you have these dependencies included in your project. The specific version shouldn&rsquo;t matter.


<a id="orga72bd89"></a>

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


<a id="org6d81a42"></a>

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


<a id="org9c6ace2"></a>

## Example 2: Nested DesignToken Usage

Here is an example demonstrating the nested nature of DesignToken for more complex theming:

<div class="HTML" id="org95244b0">
<p>
&lt;!doctype html&gt;
&lt;html lang=&ldquo;en&rdquo;&gt;
  &lt;head&gt;
    &lt;script src=&ldquo;<a href="https://unpkg.com/@babel/standalone/babel.min.js">https://unpkg.com/@babel/standalone/babel.min.js</a>&rdquo;&gt;&lt;/script&gt;
    &lt;script src=&ldquo;/node<sub>modules</sub>/react/umd/react.production.min.js&rdquo;&gt;&lt;/script&gt;
    &lt;script src=&ldquo;/node<sub>modules</sub>/react-dom/umd/react-dom.production.min.js&rdquo;&gt;&lt;/script&gt;
    &lt;script src=&ldquo;/dist/bundle.js&rdquo;&gt;&lt;/script&gt;
    &lt;style&gt;
      body {
        margin: var(&#x2013;layout-margin, 20px);
        background-color: var(&#x2013;color-bg, #f0f0f0);
        color: var(&#x2013;color-fg, #333);
      }
    &lt;/style&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id=&ldquo;root&rdquo;&gt;&lt;/div&gt;
    &lt;script type=&ldquo;text/babel&rdquo;&gt;
      const { useCssTheme } = CssVarsDesignToken;
      function NestedThemeComponent() {
        const { theme, toggle } = useCssTheme();
</p>

<p>
        return (
          &lt;div&gt;
            &lt;h1&gt;CSS Vars &amp; Design Token &#x2013; Nested Theme Example&lt;/h1&gt;
            &lt;p&gt;Current Theme: {theme}&lt;/p&gt;
            &lt;button onClick={toggle}&gt;Toggle Theme&lt;/button&gt;
          &lt;/div&gt;
        );
      }
      ReactDOM.createRoot(document.getElementById(&rsquo;root&rsquo;)).render(
        &lt;CssVarsDesignToken.CssVarsDesignTokenProvider
          themes={{
            light: {
              color: { bg: &rsquo;#fff&rsquo;, fg: &rsquo;#333&rsquo; },
              layout: { margin: 10 },
            },
            dark: {
              color: { bg: &rsquo;#333&rsquo;, fg: &rsquo;#fff&rsquo; },
              layout: { margin: 20 },
            },
          }}
        &gt;
          &lt;NestedThemeComponent /&gt;
        &lt;/CssVarsDesignToken.CssVarsDesignTokenProvider&gt;,
      );
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</p>

</div>


<a id="orgcca2a21"></a>

## Test and code coverage reports

    
    > css-vars-design-token@1.0.1 test:coverage
    > jest --coverage
    
    (node:96264) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
    (Use `node --trace-deprecation ...` to show where the warning was created)
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
    Snapshots:   0 total
    Time:        1.075 s
    Ran all test suites.

