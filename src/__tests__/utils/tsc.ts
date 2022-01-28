import {exec} from "child_process";
import {writeFileSync} from "fs";

export const tsc = () => {
  writeFileSync('tmp/tsconfig.json', JSON.stringify(tsconfig), {encoding: 'utf-8'});
  return new Promise((resolve, reject) =>
    exec("yarn tsc --project tmp/tsconfig.json", (error, stdout, stderr) => {
      if (error) {
        console.error(stdout);
        return reject(error);
      }
      if (stderr) {
        return reject(stderr);
      }
      resolve(stdout);
    }));
};

const tsconfig = {
  compilerOptions: {
    module: "commonjs",
    moduleResolution: "node",
    target: "es2019",
    strict: true,
    noImplicitAny: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    strictBindCallApply: true,
    strictPropertyInitialization: true,
    noImplicitThis: true,
    alwaysStrict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noImplicitReturns: true,
    noFallthroughCasesInSwitch: true,
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    noEmit: true
  },
  exclude: [
    "node_modules"
  ]
};
