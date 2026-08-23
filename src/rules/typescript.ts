import type { CommonsRuleOptions } from '@zokugun/eslint-toolkit';
import type { TypeScriptRuleOptions } from '../typegens/typescript.js';

import { commonsRules } from '@zokugun/eslint-toolkit';

export const typeScriptRules: Partial<TypeScriptRuleOptions | CommonsRuleOptions> = {
	...commonsRules,
	'ts/adjacent-overload-signatures': [
		'error',
	],
	'ts/array-type': [
		'error',
		{
			default: 'array-simple',
		},
	],
	'ts/await-thenable': [
		'error',
	],
	'ts/ban-ts-comment': [
		'error',
		{
			'ts-check': false,
			'ts-expect-error': 'allow-with-description',
			'ts-ignore': 'allow-with-description',
			'ts-nocheck': true,
		},
	],
	'ts/ban-tslint-comment': [
		'error',
	],
	'ts/class-literal-property-style': [
		'error',
		'fields',
	],
	'class-methods-use-this': [
		'off',
	],
	'ts/class-methods-use-this': [
		'error',
		{
			ignoreOverrideMethods: true,
		},
	],
	'ts/consistent-generic-constructors': [
		'error',
		'constructor',
	],
	'ts/consistent-indexed-object-style': [
		'error',
		'record',
	],
	'consistent-return': [
		'off',
	],
	// @TODO should not require `return` if type is `Promise<void>`
	'ts/consistent-return': [
		'off',
	],
	'ts/consistent-type-assertions': [
		'error',
	],
	'ts/consistent-type-definitions': [
		'error',
		'type',
	],
	'ts/consistent-type-exports': [
		'error',
		{
			fixMixedExportsWithInlineTypeSpecifier: true,
		},
	],
	'ts/consistent-type-imports': [
		'error',
	],
	'default-param-last': [
		'off',
	],
	'ts/default-param-last': [
		'error',
	],
	'dot-notation': [
		'off',
	],
	'ts/dot-notation': [
		'error',
		{
			allowIndexSignaturePropertyAccess: true,
			allowKeywords: true,
			allowPrivateClassPropertyAccess: false,
			allowProtectedClassPropertyAccess: false,
		},
	],
	// @TODO detect return type for overriding methods
	'ts/explicit-function-return-type': [
		'error',
	],
	'ts/explicit-member-accessibility': [
		'error',
		{
			accessibility: 'explicit',
		},
	],
	'ts/explicit-module-boundary-types': [
		'error',
	],
	'init-declarations': [
		'off',
	],
	'ts/init-declarations': [
		'error',
	],
	'max-params': [
		'off',
	],
	'ts/max-params': [
		'error',
		{
			maximum: 12,
			countVoidThis: false,
		},
	],
	'ts/member-ordering': [
		'error',
		{
			classes: {
				memberTypes: [
					"public-static-field",
					"protected-static-field",
					"private-static-field",

					"public-static-method",
					"protected-static-method",
					"private-static-method",

					"public-field",
					"public-abstract-field",
					"protected-field",
					"protected-abstract-field",
					"private-field",

					'constructor',

					["public-instance-get", "public-instance-set"],
					["public-abstract-get", "public-abstract-set"],
					["protected-instance-get", "protected-instance-set"],
					["protected-abstract-get", "protected-abstract-set"],
					["private-instance-get", "private-instance-set"],

					"public-method",
					"public-abstract-method",
					"protected-method",
					"protected-abstract-method",
					"private-method",
				],
				order: 'alphabetically-case-insensitive',
			},
			interfaces: {
				order: 'alphabetically-case-insensitive',
			},
			typeLiterals: {
				order: 'alphabetically-case-insensitive',
			},
		},
	],
	'ts/method-signature-style': [
		'error',
		'property',
	],
	'ts/naming-convention': [
		'error',
		{
			'selector': 'variable',
			'modifiers': [
				'const',
				'global',
			],
			'format': [
				'camelCase',
				'UPPER_CASE',
			],
			'filter': {
				'regex': '^(__filename|__dirname)$',
				'match': false,
			},
		},
		{
			'selector': 'variable',
			'format': [
				'camelCase',
			],
			'filter': {
				'regex': '^(__filename|__dirname)$',
				'match': false,
			},
		},
	],
	'no-array-constructor': [
		'off'
	],
	'ts/no-array-constructor': [
		'error',
	],
	'ts/no-array-delete': [
		'error',
	],
	'ts/no-base-to-string': [
		'off',
	],
	'ts/no-confusing-non-null-assertion': [
		'error',
	],
	'ts/no-confusing-void-expression': [
		'error',
		{
			ignoreArrowShorthand: true,
		},
	],
	'ts/no-deprecated': [
		'error',
	],
	'ts/no-dupe-class-members': [
		'off',
	],
	'ts/no-duplicate-enum-values': [
		'error',
	],
	'ts/no-duplicate-type-constituents': [
		'error',
	],
	'ts/no-dynamic-delete': [
		'error',
	],
	'ts/no-empty-function': [
		'error',
		{
			allow: [
				'arrowFunctions',
			],
		},
	],
	'ts/no-empty-object-type': [
		'error',
	],
	'ts/no-explicit-any': [
		'error',
	],
	'ts/no-extra-non-null-assertion': [
		'error',
	],
	'ts/no-extraneous-class': [
		'error',
	],
	'ts/no-floating-promises': [
		'error',
	],
	'ts/no-for-in-array': [
		'error',
	],
	'no-implied-eval': [
		'off',
	],
	'ts/no-implied-eval': [
		'error',
	],
	'ts/no-import-type-side-effects': [
		'error',
	],
	'ts/no-inferrable-types': [
		'off',
	],
	'ts/no-invalid-this': [
		'off',
	],
	'ts/no-invalid-void-type': [
		'error',
		{
			allowInGenericTypeArguments: true,
		}
	],
	'no-magic-numbers': [
		'off',
	],
	'ts/no-magic-numbers': [
		'off',
	],
	'ts/no-meaningless-void-operator': [
		'error',
	],
	'ts/no-misused-new': [
		'error',
	],
	'ts/no-misused-promises': [
		'error',
	],
	'ts/no-misused-spread': [
		'error',
	],
	'ts/no-mixed-enums': [
		'error',
	],
	'ts/no-namespace': [
		'off',
	],
	'ts/no-non-null-asserted-nullish-coalescing': [
		'error',
	],
	'ts/no-non-null-asserted-optional-chain': [
		'error',
	],
	'ts/no-non-null-assertion': [
		'off',
	],
	'no-redeclare': [
		'off',
	],
	'ts/no-redeclare': [
		'error',
	],
	'ts/no-redundant-type-constituents': [
		'error',
	],
	'ts/no-require-imports': [
		'error',
	],
	'ts/no-restricted-types': [
		'error',
	],
	'no-shadow': [
		'off',
	],
	'ts/no-shadow': [
		'off',
	],
	'ts/no-this-alias': [
		'error',
	],
	'ts/no-unnecessary-boolean-literal-compare': [
		'error',
	],
	'ts/no-unnecessary-condition': [
		'off',
	],
	'ts/no-unnecessary-parameter-property-assignment': [
		'error',
	],
	'ts/no-unnecessary-qualifier': [
		'error',
	],
	'ts/no-unnecessary-template-expression': [
		'error',
	],
	'ts/no-unnecessary-type-arguments': [
		'error',
	],
	'ts/no-unnecessary-type-assertion': [
		'error',
	],
	'ts/no-unnecessary-type-constraint': [
		'error',
	],
	'ts/no-unnecessary-type-conversion': [
		'error',
	],
	'ts/no-unnecessary-type-parameters': [
		'error',
	],
	'ts/no-unsafe-argument': [
		'error',
	],
	'ts/no-unsafe-assignment': [
		'error',
	],
	'ts/no-unsafe-call': [
		'error',
	],
	'ts/no-unsafe-declaration-merging': [
		'error',
	],
	'ts/no-unsafe-enum-comparison': [
		'error',
	],
	'ts/no-unsafe-function-type': [
		'error',
	],
	'ts/no-unsafe-member-access': [
		'error',
	],
	'ts/no-unsafe-return': [
		'error',
	],
	'ts/no-unsafe-type-assertion': [
		'off',
	],
	'ts/no-unsafe-unary-minus': [
		'error',
	],
	'no-unused-expressions': [
		'off',
	],
	'ts/no-unused-expressions': [
		'error',
	],
	'no-unused-private-class-members': [
		'off',
	],
	'ts/no-unused-private-class-members': [
		'error',
	],
	'no-unused-vars': [
		'off',
	],
	'ts/no-unused-vars': [
		'error',
		{
			argsIgnorePattern: '^_',
			destructuredArrayIgnorePattern: '^_',
		}
	],
	'no-use-before-define': [
		'off',
	],
	'ts/no-use-before-define': [
		'error',
		{
			functions: false,
		},
	],
	'no-useless-constructor': [
		'off',
	],
	'ts/no-useless-constructor': [
		'error',
	],
	'ts/no-useless-default-assignment': [
		'error',
	],
	'ts/no-useless-empty-export': [
		'error',
	],
	'ts/no-wrapper-object-types': [
		'error',
	],
	'ts/non-nullable-type-assertion-style': [
		'error',
	],
	'no-throw-literal': [
		'off'
	],
	'ts/only-throw-error': [
		'error',
	],
	'ts/parameter-properties': [
		'error',
		{
			allow: [
				'readonly',
			],
		},
	],
	'ts/prefer-as-const': [
		'error',
	],
	'prefer-destructuring': [
		'off',
	],
	'ts/prefer-destructuring': [
		'error',
	],
	'ts/prefer-enum-initializers': [
		'error',
	],
	'ts/prefer-find': [
		'error',
	],
	'ts/prefer-for-of': [
		'error',
	],
	'ts/prefer-function-type': [
		'error',
	],
	'ts/prefer-includes': [
		'error',
	],
	'ts/prefer-literal-enum-member': [
		'error',
	],
	'ts/prefer-namespace-keyword': [
		'error',
	],
	'ts/prefer-nullish-coalescing': [
		'error',
		{
			ignoreConditionalTests: true,
		},
	],
	'ts/prefer-optional-chain': [
		'error',
	],
	'prefer-promise-reject-errors': [
		'off',
	],
	'ts/prefer-promise-reject-errors': [
		'error',
	],
	'ts/prefer-readonly': [
		'error',
	],
	// only supported for constructor parameters or arrays
	'ts/prefer-readonly-parameter-types': [
		'off',
	],
	'ts/prefer-reduce-type-parameter': [
		'error',
	],
	'ts/prefer-regexp-exec': [
		'error',
	],
	'ts/prefer-return-this-type': [
		'error',
	],
	'ts/prefer-string-starts-ends-with': [
		'error',
	],
	'ts/promise-function-async': [
		'error',
	],
	'ts/related-getter-setter-pairs': [
		'error',
	],
	'ts/require-array-sort-compare': [
		'error',
	],
	'require-await': [
		'off',
	],
	'ts/require-await': [
		'off',
	],
	'ts/restrict-plus-operands': [
		'error',
	],
	'ts/restrict-template-expressions': [
		'error',
	],
	'ts/return-await': [
		'error',
	],
	"sort-imports": [
		'off',
	],
	// @TODO allow testing of the existence of a property in a Record
	'ts/strict-boolean-expressions': [
		'off',
	],
	'ts/strict-void-return': [
		'error',
	],
	'ts/switch-exhaustiveness-check': [
		'error',
		{
			allowDefaultCaseForExhaustiveSwitch: true,
			considerDefaultExhaustiveForUnions: true,
		},
	],
	'ts/triple-slash-reference': [
		'error',
	],
	'ts/unbound-method': [
		'error',
		{
			ignoreStatic: true,
		},
	],
	'ts/unified-signatures': [
		'error',
	],
	'ts/use-unknown-in-catch-callback-variable': [
		'error',
	],
};
