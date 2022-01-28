import {readFile} from "fs-extra";
import {glob} from 'glob';
import Handlebars, {registerPartial} from "handlebars";
import paths from "../paths";

const partial = registerPartial.bind(Handlebars);

const convertName = (match: string) =>
  match.replace(`${paths.templates}/`, '')
    .replace('partials/', '')
    .replace('.hbs', '');

export const register = () =>
  new Promise<string[]>((resolve, reject) =>
    glob('/**/partials/**/*.hbs',
      {root: paths.templates},
      (err, matches) => err ? reject(err) : resolve(matches)))
    .then(matches => matches.map<{ name: string, path: string }>(match =>
      ({name: convertName(match), path: match})))
    .then(files => Promise.all(
      files.map(({name, path}) => readFile(path, {encoding: 'utf-8'})
        .then(data => partial(name, data))))
    );
