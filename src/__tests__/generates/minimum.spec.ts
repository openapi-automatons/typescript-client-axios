import {Openapi} from '@automatons/tools';
import {remove} from "fs-extra";
import {expectFormat} from "../../../test/expects/expectFormat";
import {generate} from "../../generator";
import paths from "../../paths";

jest.setTimeout(50000);

it('should generate minimum', async () => {
  await generate(minimumOpenapi, {path: '', openapiPath: '', outDir: paths.tmp});

  await expectFormat();
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
