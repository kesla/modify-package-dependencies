import _getPackage from 'get-pkg-json';
import {getIn, set, setIn, without} from 'immutable-object-methods';
import find from 'lodash.find';

import setupGetNameAndVersion from './get-name-and-version';
import remove from './remove';

const inject = getPackage => {
  const getNameAndVersion = setupGetNameAndVersion(getPackage);

  return {
    add: (packageJson, args) =>
      Promise.all(args.map(getNameAndVersion))
        .then(rows => {
          let result = packageJson;
          rows.forEach(({name, version}) => {
            if (packageJson.devDependencies) {
              result = set(packageJson, 'devDependencies',
                without(packageJson.devDependencies, name));
            }
            result = setIn(result, ['dependencies', name], version);
          });
          return result;
        }),

    addDev: (packageJson, args) =>
      Promise.all(args.map(getNameAndVersion))
        .then(rows => {
          const errorRow = find(rows, ({name}) => {
            return getIn(packageJson, ['dependencies', name]);
          });

          if (errorRow) {
            return Promise.reject(new Error(`"${errorRow.name}" is already in dependencies`));
          }

          let result = packageJson;
          rows.forEach(({name, version}) => {
            result = setIn(result, ['devDependencies', name], version);
          });
          return Promise.resolve(result);
        }),

    remove
  };
};

module.exports = inject(_getPackage);
module.exports.inject = inject;
