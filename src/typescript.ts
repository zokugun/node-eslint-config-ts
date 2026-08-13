import type { CommonsRuleOptions, Configurator, OptionFiles, OptionIgnores, OptionOverridesFiles, OptionOverridesIgnores, OptionRules } from '@zokugun/eslint-toolkit';
import type { RuleOptions as TypeScriptRuleOptions } from './typegens/typescript.js';

import {plugin} from 'typescript-eslint';
import parser, { type ParserOptions } from '@typescript-eslint/parser';
import { rules } from './rules/typescript.js';

export const GLOB_TS = '**/*.?([cm])ts';
export const GLOB_TSX = '**/*.?([cm])tsx';
export const GLOB_MARKDOWN = '**/*.md';

export type OptionsParserOptions = {
	parserOptions?: Partial<ParserOptions>;
	filesTypeAware?: string[];
	ignoresTypeAware?: string[];
};

export type OptionsComponentExts = {
	componentExts?: string[];
};

export type OptionsTsConfig = {
	tsconfigPath?: string;
	overridesTypeAware?: CommonsRuleOptions | TypeScriptRuleOptions;
};

type Options = OptionRules<CommonsRuleOptions | TypeScriptRuleOptions> & OptionFiles & OptionIgnores & OptionOverridesFiles & OptionOverridesIgnores & OptionsComponentExts & OptionsParserOptions & OptionsTsConfig;

export function typescript(options: Options = {}): Configurator {
	const {
		componentExts = [],
		parserOptions = {},
	} = options;

	const files = options.overrides?.files ?? [
		GLOB_TS,
		...componentExts.map((ext) => `**/*.${ext}`),
		...(options.files ?? []),
	];
	const ignores = options.overrides?.ignores ?? options.ignores ?? [];

	const filesTypeAware = options.filesTypeAware ?? [GLOB_TS, GLOB_TSX];
	const ignoresTypeAware = options.ignoresTypeAware ?? [`${GLOB_MARKDOWN}/**`];
	const tsconfigPath = options.tsconfigPath ? options.tsconfigPath : 'tsconfig.json';

	return (resolve, register) => {
		register('javascript.sources', files);

		const globals = resolve('javascript.globals.default');

		return [
			{
				name: 'zokugun/typescript/rules',
				files,
				ignores,
				plugins: {
					ts: plugin,
				},
				rules: {
					...rules,
					...options.rules,
				},
			},
			{
				name: `zokugun/typescript/parser`,
				files,
				ignores,
				languageOptions: {
					globals,
					parser,
					parserOptions: {
						extraFileExtensions: componentExts.map(ext => `.${ext}`),
						sourceType: 'module',
						...parserOptions,
					},
				},
			},
			{
				name: `zokugun/typescript/type-aware-parser`,
				files: filesTypeAware,
				ignores: [
					...ignoresTypeAware,
					...ignores,
				],
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
			},
			{
				files: ['**/*.cts'],
				ignores,
				languageOptions: {
					globals: resolve('javascript.globals.cjs'),
				},
			},
			{
				files: ['**/*.mts'],
				ignores,
				languageOptions: {
					globals: resolve('javascript.globals.esm'),
				},
			},
		];
	};
}
