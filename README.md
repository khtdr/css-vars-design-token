
# Table of Contents

1.  [Documentation Generation](#org9b09479)



<a id="org9b09479"></a>

# Documentation Generation

    
    > css-vars-design-token@0.0.9 lint
    > eslint --ignore-pattern coverage --ignore-pattern dist --ignore-pattern '**/*test.*'

    
    > css-vars-design-token@0.0.9 test:coverage
    > jest --coverage
    
    (node:89813) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
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
    Time:        1.116 s
    Ran all test suites.

