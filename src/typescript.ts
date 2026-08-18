import type { ParserOptions } from '@typescript-eslint/parser';
import type { CommonsRuleOptions, Configurator, DefaultOptions } from '@zokugun/eslint-toolkit';
import type { Linter } from 'eslint';
import type { TypeScriptRuleOptions } from './typegens/typescript.js';

import parser from '@typescript-eslint/parser';
import { filterOutRules } from '@zokugun/eslint-toolkit';
import { plugin } from 'typescript-eslint';

import { typeScriptRules } from './rules/typescript.js';
import { AWARE_TYPE_RULES } from './utils/constants.js';

type Options = DefaultOptions<CommonsRuleOptions | TypeScriptRuleOptions> & {
	componentExts?: string[];
	parserOptions?: Partial<ParserOptions>;
	tsconfigPath?: string;
};

export function typescript(options: Options = {}): Configurator {
	const {
		componentExts = [],
		parserOptions = {},
		tsconfigPath = 'tsconfig.json',
	} = options;

	return (resolve, register) => {
		const globals = resolve('javascript/globals/default');

		const files = options.overrides?.files ?? [
			'**/*.?([cm])ts',
			'**/*.?([cm])tsx',
			...componentExts.map((ext) => `**/*.${ext}`),
			...(options.files ?? []),
		];

		const embeddedFiles = options.embedded?.overrides?.files ?? [
			...resolve<string>('embedded/sources', []).map((value) => `${value}/*.ts`),
			...(options.embedded?.files ?? []),
		];

		const ignores = options.overrides?.ignores ?? [
			...embeddedFiles,
			...(options.ignores ?? []),
		];

		register('javascript/sources', files);

		const configs: Linter.Config[] = [
			{
				name: 'zokugun/typescript/plugin',
				plugins: {
					ts: plugin,
				},
			},
			{
				name: 'zokugun/typescript/globals/cjs',
				files: ['**/*.cts'],
				ignores,
				languageOptions: {
					globals: resolve('javascript/globals/cjs'),
				},
			},
			{
				name: 'zokugun/typescript/globals/esm',
				files: ['**/*.mts'],
				ignores,
				languageOptions: {
					globals: resolve('javascript/globals/esm'),
				},
			},
		];

		if(files.length > 0) {
			const rules = options.overrides?.rules ?? {
				...typeScriptRules,
				...options.rules,
			};

			configs.push({
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
				rules,
			});
		}

		if(embeddedFiles.length > 0) {
			const ignores = options.embedded?.overrides?.ignores ?? options.embedded?.ignores ?? [];
			const rules = options.embedded?.overrides?.rules ?? {
				...filterOutRules<CommonsRuleOptions | TypeScriptRuleOptions>(typeScriptRules, AWARE_TYPE_RULES),
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

			configs.push({
				name: 'zokugun/typescript/embedded',
				files: embeddedFiles,
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
				rules,
			});
		}

		return configs;
	};
}
