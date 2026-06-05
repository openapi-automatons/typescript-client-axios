import path from "node:path";
import {mkdir, readFile, writeFile} from "node:fs/promises";
import {format} from "prettier";
import Handlebars from "handlebars";
import paths from "../paths";

export const write = async (template: string, outDir: string | string[], context?: any) => {
  const outputPath = Array.isArray(outDir) ? path.resolve(...outDir) : outDir;
  await mkdir(path.dirname(outputPath), {recursive: true});
  const data = await readFile(path.resolve(paths.templates, template), {encoding: 'utf-8'});
  const formatted = await format(Handlebars.compile(data)(context), {parser: 'typescript'});
  return writeFile(outputPath, formatted);
};
