import {Openapi} from '@automatons/tools';
import {remove} from "fs-extra";
import {eslint} from "../../../test/utils/eslint";
import {tsc} from "../../../test/utils/tsc";
import {generate} from "../../generator";
import paths from "../../paths";

jest.setTimeout(50000);

it('should generate minimum', async () => {
  await generate(minimumOpenapi, {path: '', openapiPath: '', outDir: paths.tmp});

  expect(async () => await tsc()).not.toThrow();
  expect(async () => await eslint()).not.toThrow();
});

beforeEach(async () => {
  await remove(paths.tmp);
});

const minimumOpenapi: Openapi = {
  openapi: '3.0.3',
  info: {
    title: 'example',
    version: '0.0.0'
  },
  paths: {}
};
