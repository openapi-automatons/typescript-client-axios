import {readdirSync, readFileSync} from "fs";
import {basename} from "path";
import generatorTypescriptAxiosClient from '../src'

const openapiDir = 'test/openapis/';
const outputDir = 'test/generates/';

Promise.all(readdirSync(openapiDir)
  .map(filename => generatorTypescriptAxiosClient(JSON.parse(readFileSync(openapiDir + filename, {encoding: 'utf-8'})),
    {
      outDir: outputDir + basename(filename, '.json'),
      path: process.cwd(),
      openapiPath: openapiDir + filename
    },
    {})))
