import path from 'node:path';

const paths = {
  src: path.resolve(import.meta.dirname),
  templates: path.resolve(import.meta.dirname, 'templates'),
  tmp: path.resolve(import.meta.dirname, '../tmp')
};
export default paths;
