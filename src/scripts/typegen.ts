import { compile } from 'json-schema-to-typescript';
import fetch from 'isomorphic-unfetch';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const JSONRESUME_SCHEMA_URL =
  'https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json';

async function generateSchemaTS() {
  const schemaJSON = await fetch(JSONRESUME_SCHEMA_URL);
  const schema = await schemaJSON.json();

  const ts = await compile(schema, 'JSON Resume Schema');
  await writeFile(resolve(__dirname, '../generated/schema.ts'), ts, 'utf-8');
}

generateSchemaTS();
