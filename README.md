[@zokugun/eslint-config-ts](https://github.com/zokugun/node-eslint-config-ts)
=============================================================================

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@zokugun/eslint-config-ts.svg?colorB=green)](https://www.npmjs.com/package/@zokugun/eslint-config-ts)
[![Donation](https://img.shields.io/badge/donate-ko--fi-green)](https://ko-fi.com/daiyam)
[![Donation](https://img.shields.io/badge/donate-liberapay-green)](https://liberapay.com/daiyam/donate)
[![Donation](https://img.shields.io/badge/donate-paypal-green)](https://paypal.me/daiyam99)

> A ready-to-use ESLint configuration for TypeScript. Customize files, ignores and rules per project. Integrates EditorConfig to match your coding style.

Features
--------

- **Efficient Setup**: Quick-start configuration that require minimal boilerplate.
- **Flexible Configuration**: Easily override default file globs, ignores, or specific rule configurations.
- **EditorConfig Integration**: Automatically adjusts the coding style based on your project's EditorConfig file.
- **Type Safety**: Fully typed configuration options via TypeScript for better developer experience.

Installation
------------

```bash
npm add @zokugun/eslint-config-ts
```

Quick Start
-----------

```typescript
import { configure, gitignore, ignores } from '@zokugun/eslint-config';
import { typescript } from '@zokugun/eslint-config-ts';

export default configure([
	ignores(),
	gitignore(),
	typescript(),
]);
```

API reference
-------------

```typescript
type OptionsParserOptions = {
	parserOptions?: Partial<ParserOptions>;
	filesTypeAware?: string[];
	ignoresTypeAware?: string[];
};

type OptionsComponentExts = {
	componentExts?: string[];
};

type OptionsTsConfig = {
	tsconfigPath?: string;
	overridesTypeAware?: CommonsRuleOptions | TypeScriptRuleOptions;
};

function typescript(options?: OptionRules<CommonsRuleOptions | TypeScriptRuleOptions> & OptionFiles & OptionIgnores & OptionOverridesFiles & OptionOverridesIgnores & OptionsComponentExts & OptionsParserOptions & OptionsTsConfig): Configurator;
```

Contributions
-------------

Contributions are most welcome. Please:
- Open issues and feature requests under the repository discussions.
- Follow the [`CONTRIBUTING.md`](./CONTRIBUTING.md).

Donations
---------

Support this project by becoming a financial contributor.

<table>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_kofi.png" alt="Ko-fi" width="80px" height="80px"></td>
        <td><a href="https://ko-fi.com/daiyam" target="_blank">ko-fi.com/daiyam</a></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_liberapay.png" alt="Liberapay" width="80px" height="80px"></td>
        <td><a href="https://liberapay.com/daiyam/donate" target="_blank">liberapay.com/daiyam/donate</a></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_paypal.png" alt="PayPal" width="80px" height="80px"></td>
        <td><a href="https://paypal.me/daiyam99" target="_blank">paypal.me/daiyam99</a></td>
    </tr>
</table>

License
-------

Copyright &copy; 2026-present Baptiste Augrain

Licensed under the [MIT license](https://opensource.org/licenses/MIT).
