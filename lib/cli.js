import {join} from 'path';

import readJSON from 'then-read-json';
import

import parseArgs from './parse-args';
import actions from './index';

export default args => {
  const {add, addDev, remove} = parseArgs(args);

  readJSON(join(process.cwd(), 'package.json'))
    .then(json =>
      let packageJson = json;

      remove.forEach(row => {
        packageJson = remove(packageJson, row);
      });
      return Promise.resolve(packageJson);
    )
}
