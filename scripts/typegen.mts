import { buildTypeGen } from '@zokugun/eslint-typegen-plus';
import typescript from 'typescript-eslint';

await buildTypeGen('ts', typescript.plugin, 'typescript.d.ts', { overwrite: true });
