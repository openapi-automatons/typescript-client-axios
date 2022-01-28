import {exec} from "child_process";
import {writeFileSync} from "fs";

export const eslint = () => {
  writeFileSync('tmp/.eslintrc', JSON.stringify(eslintrc
  ), {encoding: 'utf-8'})

  return new Promise((resolve, reject) =>
    exec("node_modules/.bin/eslint --ext .ts tmp/**", (error, stdout, stderr) => {
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

const eslintrc = {
  extends: ["prettier"],
  rules: {
    'valid-jsdoc': ['warn'],
    'require-jsdoc': ['warn']
  }
};
