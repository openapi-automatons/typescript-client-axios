import {Openapi} from '@automatons/tools';
import {remove} from "fs-extra";
import {expectFormat} from "../expects/expectFormat";
import {generate} from "../../generator";
import paths from "../../paths";

jest.setTimeout(50000);

it('should generate with security', async () => {
  await generate(openapi, {path: '', openapiPath: '', outDir: paths.tmp});

  await expectFormat();
});

beforeEach(async () => {
  await remove(paths.tmp);
});

const openapi: Openapi = {
  openapi: '3.1.0',
  info: {
    title: 'example',
    version: '0.0.0'
  },
  servers: [
    {url: 'test'}
  ],
  paths: {
    'test/': {
      get: {
        operationId: 'operationId',
        responses: {
          'application/json': {
            description: 'description',
            content: {
              '200': {
                schema: {
                  type: 'object'
                }
              }
            }
          }
        }
      }
    }
  }
};
