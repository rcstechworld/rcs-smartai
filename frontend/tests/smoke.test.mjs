import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('frontend exposes the RCS SmartAI product identity', async () => {
  const page = await readFile(new URL('../app/page.js', import.meta.url), 'utf8');
  assert.match(page, /RCS SmartAI/);
  assert.match(page, /Your AI Business Manager/);
});
