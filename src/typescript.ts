import { filterOutRules, type CommonsRuleOptions, type Configurator, type OptionFiles, type OptionIgnores, type OptionOverridesFiles, type OptionOverridesIgnores, type OptionRules } from '@zokugun/eslint-toolkit';
import type { RuleOptions as TypeScriptRuleOptions } from './typegens/typescript.js';

import { plugin } from 'typescript-eslint';
import parser, { type ParserOptions } from '@typescript-eslint/parser';
import { rules } from './rules/typescript.js';
import { AWARE_TYPE_RULES } from './utils/constants.js';

type OptionsEmbedded = {
	files?: string[];
	ignores?: string[];
	rules?: Partial<CommonsRuleOptions | TypeScriptRuleOptions>
};

type Options = OptionRules<CommonsRuleOptions | TypeScriptRuleOptions> & OptionFiles & OptionIgnores & OptionOverridesFiles & OptionOverridesIgnores & {
	componentExts?: string[];
	parserOptions?: Partial<ParserOptions>;
	tsconfigPath?: string;
	embedded?: OptionsEmbedded & { overrides?: OptionsEmbedded };
};

export function typescript(options: Options = {}): Configurator {
	const {
		componentExts = [],
		parserOptions = {},
		tsconfigPath = 'tsconfig.json',
	} = options;

	return (resolve, register) => {
		const globals = resolve('javascript.globals.default');

		const embeddedFiles = options.embedded?.overrides?.files ?? [
			...resolve<string>('embedded.sources', []).map((value) => `${value}/*.ts`),
			...(options.embedded?.files ?? []),
		];
		const embeddedIgnores = options.embedded?.overrides?.ignores ?? options.embedded?.ignores ?? [];
		const embeddedRules = options.embedded?.overrides?.rules ?? {
			...filterOutRules<CommonsRuleOptions | TypeScriptRuleOptions>(rules, AWARE_TYPE_RULES),
			'no-console': [
				'off',
			],
			'no-undef': [
				'off',
			],
			'ts/no-invalid-void-type': [
				'off',
			],
			'ts/member-ordering': [
				'off',
			],
			'ts/no-unused-vars': [
				'off',
			],
			...filterOutRules<CommonsRuleOptions | TypeScriptRuleOptions>(options.rules, AWARE_TYPE_RULES),
			...options.embedded?.rules,
		};

		const files = options.overrides?.files ?? [
			'**/*.?([cm])ts',
			'**/*.?([cm])tsx',
			...componentExts.map((ext) => `**/*.${ext}`),
			...(options.files ?? []),
		];
		const ignores = options.overrides?.ignores ?? [
			...embeddedFiles,
			...(options.ignores ?? []),
		];

		register('javascript.sources', files);

		return [
			{
				name: 'zokugun/typescript/plugin',
				plugins: {
					ts: plugin,
				},
			},
			{
				name: 'zokugun/typescript/rules',
				files,
				ignores,
				languageOptions: {
					globals,
					parser,
					parserOptions: {
						extraFileExtensions: componentExts.map(ext => `.${ext}`),
						sourceType: 'module',
						projectService: {
							allowDefaultProject: ['*.?([cm])[jt]s'],
							defaultProject: tsconfigPath,
						},
						tsconfigRootDir: resolve('cwd'),
						...parserOptions,
					},
				},
				rules: {
					...rules,
					...options.rules,
				},
			},
			{
				name: 'zokugun/typescript/globals/cjs',
				files: ['**/*.cts'],
				ignores,
				languageOptions: {
					globals: resolve('javascript.globals.cjs'),
				},
			},
			{
				name: 'zokugun/typescript/globals/esm',
				files: ['**/*.mts'],
				ignores,
				languageOptions: {
					globals: resolve('javascript.globals.esm'),
				},
			},
			{
				name: 'zokugun/typescript/embedded',
				files: embeddedFiles,
				ignores: embeddedIgnores,
				languageOptions: {
					globals,
					parser,
					parserOptions: {
						extraFileExtensions: componentExts.map(ext => `.${ext}`),
						sourceType: 'module',
						...parserOptions,
					},
				},
				rules: embeddedRules,
			},
		];
	};
}
