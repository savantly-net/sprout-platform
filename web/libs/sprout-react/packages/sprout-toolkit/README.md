# sprout-toolkit

sprout-toolkit is a CLI that enables efficient development of Sprout plugins. We want to help our community focus on the core value of their plugins rather than all the setup required to develop them.

## Getting started

Set up a new plugin with `sprout-toolkit plugin:create` command:

```sh
npx @savantly/sprout-toolkit plugin:create my-sprout-plugin
cd my-sprout-plugin
yarn install
yarn dev
```

## Usage

With sprout-toolkit, we give you a CLI that addresses common tasks performed when working on Sprout plugin:

- `sprout-toolkit plugin:create`
- `sprout-toolkit plugin:dev`
- `sprout-toolkit plugin:test`
- `sprout-toolkit plugin:build`

### Create your plugin

`sprout-toolkit plugin:create plugin-name`

This command creates a new Sprout plugin from template.

If `plugin-name` is provided, then the template is downloaded to `./plugin-name` directory. Otherwise, it will be downloaded to the current directory.

### Develop your plugin

`sprout-toolkit plugin:dev`

This command creates a development build that's easy to play with and debug using common browser tooling.

Available options:

- `-w`, `--watch` - run development task in a watch mode

### Test your plugin

`sprout-toolkit plugin:test`

This command runs Jest against your codebase.

Available options:

- `--watch` - Runs tests in interactive watch mode.
- `--coverage` - Reports code coverage.
- `-u`, `--updateSnapshot` - Performs snapshots update.
- `--testNamePattern=<regex>` - Runs test with names that match provided regex (https://jestjs.io/docs/en/cli#testnamepattern-regex).
- `--testPathPattern=<regex>` - Runs test with paths that match provided regex (https://jestjs.io/docs/en/cli#testpathpattern-regex).

### Build your plugin

`sprout-toolkit plugin:build`

This command creates a production-ready build of your plugin.

## FAQ

### Which version of sprout-toolkit should I use?

See [Sprout packages versioning guide](https://github.com/savantly/sprout-platform/blob/master/packages/README.md#versioning).

### What tools does sprout-toolkit use?

sprout-toolkit comes with TypeScript, ESLint, Prettier, Jest, CSS and SASS support.

### Can I use TypeScript to develop Sprout plugins?

Yes! sprout-toolkit supports TypeScript by default.

### How can I test my plugin?

sprout-toolkit comes with Jest as a test runner.

Internally at Savantly we use Enzyme. If you are developing React plugin and you want to configure Enzyme as a testing utility, then you need to configure `enzyme-adapter-react`. To do so, create `<YOUR_PLUGIN_DIR>/config/jest-setup.ts` file that will provide necessary setup. Copy the following code into that file to get Enzyme working with React:

```ts
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

You can also set up Jest with shims of your needs by creating `jest-shim.ts` file in the same directory: `<YOUR_PLUGIN_DIR_>/config/jest-shim.ts`

### Can I provide custom setup for Jest?

You can provide custom Jest configuration with a `package.json` file. For more details, see [Jest docs](https://jest-bot.github.io/jest/docs/configuration.html).

Currently we support following Jest configuration properties:

- [`snapshotSerializers`](https://jest-bot.github.io/jest/docs/configuration.html#snapshotserializers-array-string)
- [`moduleNameMapper`](https://jestjs.io/docs/en/configuration#modulenamemapper-object-string-string)

### How can I customize Webpack rules or plugins?

You can provide your own `webpack.config.js` file that exports a `getWebpackConfig` function. We recommend that you extend the standard configuration, but you are free to create your own:

```js
const CustomPlugin = require('custom-plugin');

module.exports.getWebpackConfig = (config, options) => ({
  ...config,
  plugins: [...config.plugins, new CustomPlugin()],
});
```

### How can I style my plugin?

We support pure CSS, SASS, and CSS-in-JS approach (via [Emotion](https://emotion.sh/)).

#### Single CSS or SASS file

Create your CSS or SASS file and import it in your plugin entry point (typically `module.ts`):

```ts
import 'path/to/your/css_or_sass';
```

The styles will be injected via `style` tag during runtime.

> Note that imported static assets will be inlined as base64 URIs. _This can be subject of change in the future!_


#### Emotion

_our suggested way_ for styling plugins is by using [Emotion](https://emotion.sh). It's a CSS-in-JS library that we use internally at Savantly. The biggest advantage of using Emotion is that you can access Sprout Theme variables.

To start using Emotion, you first must add it to your plugin dependencies:

```
  yarn add "emotion"@10.0.27
```

Then, import `css` function from Emotion:

```ts
import { css } from 'emotion';
```

Now you are ready to implement your styles:

```tsx
const MyComponent = () => {
  return (
    <div
      className={css`
        background: red;
      `}
    />
  );
};
```

To learn more about using Sprout theme please refer to [Theme usage guide](https://github.com/savantly/sprout-platform/blob/master/style_guides/themes.md#react)

> We do not support Emotion's `css` prop. Use className instead!

### Can I adjust TypeScript configuration to suit my needs?

Yes! However, it's important that your `tsconfig.json` file contains the following lines:

```json
{
  "extends": "./node_modules/@savantly/sprout-toolkit/src/config/tsconfig.plugin.json",
  "include": ["src"],
  "compilerOptions": {
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types"]
  }
}
```

### Can I adjust ESLint configuration to suit my needs?

sprout-toolkit comes with [default config for ESLint](https://github.com/savantly/sprout-platform/blob/master/libs/sprout-react/packages/sprout-toolkit/src/config/eslint.plugin.json). For now, there is now way to customise ESLint config.

### How is Prettier integrated into sprout-toolkit workflow?

When building plugin with [`sprout-toolkit plugin:build`](#building-plugin) task, sprout-toolkit performs Prettier check. If the check detects any Prettier issues, the build will not pass. To avoid such situation we suggest developing plugin with [`sprout-toolkit plugin:dev --watch`](#developing-plugin) task running. This task tries to fix Prettier issues automatically.

### My editor does not respect Prettier config, what should I do?

In order for your editor to pick up our Prettier config you need to create `.prettierrc.js` file in the root directory of your plugin with following content:

```js
module.exports = {
  ...require('./node_modules/@savantly/sprout-toolkit/src/config/prettier.plugin.config.json'),
};
```

### How do I add third-party dependencies that are not npm packages?

Put them in the `static` directory in the root of your project. The `static` directory is copied when the plugin is built.

### I am getting this message when I run yarn install: `Request failed \"404 Not Found\"`

If you are using version `canary`, this error occurs because a `canary` release unpublishes previous versions leaving `yarn.lock` outdated. Remove `yarn.lock` and run `yarn install` again.

### I am getting this message when I run my plugin: `Unable to dynamically transpile ES module A loader plugin needs to be configured via SystemJS.config({ transpiler: 'transpiler-module' }).`

This error occurs when you bundle your plugin using the `sprout-toolkit plugin:dev` task and your code comments include ES2016 code.

There are two issues at play:

- The `sprout-toolkit plugin:dev` task does not remove comments from your bundled package.
- Sprout does not support [ES modules](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/).

If your comments include ES2016 code, then SystemJS v0.20.19, which Sprout uses internally to load plugins, interprets your code as an ESM and fails.

To fix this error, remove the ES2016 code from your comments.

## Contribute to sprout-toolkit

You can contribute to sprout-toolkit by helping develop it or by debugging it.

### Develop sprout-toolkit

Typically plugins should be developed using the `@savantly/sprout-toolkit` installed from npm. However, when working on the toolkit, you might want to use the local version. Follow the steps below to develop with a local version:

1. Clone [Sprout repository](https://github.com/savantly/sprout-platform).
2. Navigate to the sub-directory `libs/sprout-react/packages/sprout-toolkit` where you have cloned Sprout repo to and then run `yarn install --pure-lockfile`, then run `yarn link`.
3. Navigate to the directory where your plugin code is and then run `npx sprout-toolkit plugin:dev --yarnlink`. This adds all dependencies required by sprout-toolkit to your project, as well as link your local sprout-toolkit version to be used by the plugin.

### Debug sprout-toolkit

To debug sprout-toolkit you can use standard [NodeJS debugging methods](https://nodejs.org/de/docs/guides/debugging-getting-started/#enable-inspector) (`node --inspect`, `node --inspect-brk`).

To run sprout-toolkit in a debugging session use the following command in the toolkit's directory:

`node --inspect-brk ./bin/sprout-toolkit.js [task]`

To run [linked](#develop-sprout-toolkit) sprout-toolkit in a debugging session use the following command in the plugin's directory:

`node --inspect-brk ./node_modules/@savantly/sprout-toolkit/bin/sprout-toolkit.js [task]`
