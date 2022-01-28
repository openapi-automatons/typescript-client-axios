import {Openapi} from '@automatons/tools';
import {remove} from "fs-extra";
import {join} from "path";
import {expectFormat} from "../expects/expectFormat";
import {generate} from "../../generator";
import paths from "../../paths";

jest.setTimeout(50000);
const outDir = join(paths.tmp, 'minimum');

it('should generate with minimum', async () => {
  await generate(openapi, {path: '', openapiPath: '', outDir});

  await expectFormat();
});

beforeEach(async () => {
  await remove(outDir);
});

const openapi: Openapi = {
  openapi: '3.0.3',
  info: {
    title: 'example',
    version: '0.0.0'
  },
  paths: {}
};
