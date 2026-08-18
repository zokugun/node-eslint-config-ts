import { buildTypeGen } from '@zokugun/eslint-typegen-plus';
import typescript from 'typescript-eslint';

await buildTypeGen({
	name: 'ts',
	fileName: 'typescript.d.ts',
	typeName: 'TypeScriptRuleOptions',
	plugin: typescript.plugin,
	overwrite: true,
});
