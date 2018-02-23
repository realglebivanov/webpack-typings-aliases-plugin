# webpack-typings-aliases-plugin
Resolves typings aliases for typescript replacing them with relative paths.

# About
Sometimes you have the same aliases in your webpack config and typescript config. 
Neither webpack(I mean plugins) nor typescript replace this aliases with actual paths to make aliases correct.
This plugin is exactly for that situation. 
After all aliases are correctly resolved you can use, e.g. Dts-bundle to bundle them in single file.

# Installation
```
npm i -D webpack-typings-aliases-plugin
```

# Usage
```
const WebpackTypingsAliasesPlugin = require('webpack-typings-aliases-plugin');

// ---


plugins: [
  new WebpackTypingsAliasesPlugin({
    aliases: aliases, // webpack config aliases
    srcDir: paths.ts.srcDir, // directory where source `*.ts` files are located
    buildDir: paths.ts.buildDir // directory where emitted `*.d.ts` definitions are located
  }),
  ...
]
```

Also, you need to set `"declaration": true` in you `tsconfig.json`.
