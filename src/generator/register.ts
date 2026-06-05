import {readFile} from "node:fs/promises";
import {glob} from 'glob';
import Handlebars from "handlebars";
import paths from "../paths";

const partial = Handlebars.registerPartial.bind(Handlebars);

const convertName = (match: string) =>
  match.replace(`${paths.templates}/`, '')
    .replace('partials/', '')
    .replace('.hbs', '');

export const register = () =>
  glob('**/partials/**/*.hbs', {cwd: paths.templates, absolute: true})
    .then(matches => matches.map<{ name: string, path: string }>(match =>
      ({name: convertName(match), path: match})))
    .then(files => Promise.all(
      files.map(({name, path}) => readFile(path, {encoding: 'utf-8'})
        .then(data => partial(name, data))))
    );
