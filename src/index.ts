import * as Eta from 'eta';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

import type { ResumeSchema } from './generated/schema';

export async function render(resume: ResumeSchema) {
  Eta.configure({
    views: resolve(__dirname, '../partials'),
  });

  const css = await readFile(
    resolve(__dirname, '../assets/style.css'),
    'utf-8',
  );

  return Eta.render('<%~ includeFile("resume.eta", it) %>', { resume, css });
}
