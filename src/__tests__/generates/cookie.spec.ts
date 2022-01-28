import {Openapi} from '@automatons/tools';
import {remove} from "fs-extra";
import {generate} from "../../generator";
import paths from "../../paths";
import {expectFormat} from "../expects/expectFormat";

jest.setTimeout(50000);

it('should generate with cookie', async () => {
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
        security: [{
          cookieAuth: []
        }],
        parameters: [{
          name: 'cookie',
          in: 'cookie',
          style: 'form',
          schema: {
            type: 'string'
          }
        }],
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
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'JSESSIONID'
      }
    }
  },
  security: [{
    cookieAuth: []
  }]
};
