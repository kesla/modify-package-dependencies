import {join} from 'path';

import readJSON from 'then-read-json';
import fs from 'then-fs';
import sortObject from 'sort-object';

import {args} from './';

const shouldSort = (key, value) => (key === 'dependencies' || key === 'devDependencies') &&
  typeof value === 'object';

const replacer = (key, value) =>
  shouldSort(key, value) ? sortObject(value) : value;

export default inputArgs => {
  const fileName = join(process.cwd(), 'package.json');
  readJSON(fileName)
    .then(packageJson =>
      args(packageJson, inputArgs)
    )
    .then(newPackageJson => {
      const string = JSON.stringify(newPackageJson, replacer, 2);

      return fs.writeFile(fileName, string);
    })
    .catch(err => {
      throw err;
    });
};
