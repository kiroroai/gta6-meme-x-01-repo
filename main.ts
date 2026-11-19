// Entry program for the make.fun bounty "Post a GTA 6 meme on X" (gta6-meme-x-01).
//
// The entry itself is the X post: the meme picture plus its text, which the
// house reads from X. This program's whole job is to hand in the post's
// address: it copies POST.json from the repository root into the output
// directory, where the gate reads it.
//
// Locally, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and
// /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR || '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

mkdirSync(outputDir, { recursive: true });

const source = join(botDir, 'POST.json');
const target = join(outputDir, 'POST.json');
try {
  copyFileSync(source, target);
  const handedIn = JSON.parse(readFileSync(target, 'utf8')) as { url?: string };
  console.log(`copied ${source} -> ${target}; post: ${handedIn.url ?? '(no url)'}`);
} catch (error) {
  console.error(`could not copy POST.json from ${botDir}: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
