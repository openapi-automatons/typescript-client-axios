import {readFile} from "fs-extra";
import {compile} from "handlebars";
import path from "path";
import paths from "../../../paths";
import {ArraySchema, Schema} from "@automatons/parser";
import {setup} from "../../../generator/setup";


describe('array', () => {
  beforeAll(() => setup());

  it.each <[ArraySchema, string]>([
    [{type: 'array'}, 'any[]'],
    [{type: 'array', nullable: true}, 'any[] | null'],
  ])('should be parse. [%p -> %s]', async (schema: ArraySchema, expected: string) => {
    const data = await readFile(path.resolve(paths.templates, 'models/partials/array.hbs'), {encoding: 'utf-8'});
    expect(compile(data)(schema)).toBe(expected);
  });

  it.each<[Schema | undefined, string]>([
    [undefined, 'any[]'],
    [{type: 'string'}, 'Array<string>'],
    [{type: 'string', nullable: true}, 'Array<string | null>'],
    [{type: 'string', enum: ['one', 'two']}, 'Array<"one" | "two">'],
    [{type: 'model', name: 'Test'}, 'Array<Test>']
  ])('should be parse items. [%p -> %s]', async (schema: Schema | undefined, expected: string) => {
    const data = await readFile(path.resolve(paths.templates, 'models/partials/array.hbs'), {encoding: 'utf-8'});
    expect(compile(data)({type: 'array', items: schema})).toBe(expected);
  });
});
