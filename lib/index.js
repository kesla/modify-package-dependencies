import _getPackage from 'get-pkg-json';
import {getIn, set, setIn, without} from 'immutable-object-methods';
import npa from 'npm-package-arg';

const setupGetNameAndVersion = getPackage => arg =>
  getPackage(arg).then(pkg => {
    const {type, hosted} = npa(arg);

    if (type === 'hosted') {
      return {
        name: pkg.name,
        version: hosted.shortcut
      };
    }

    return {
      name: pkg.name,
      version: `^${pkg.version}`
    };
  });

const inject = getPackage => {
  const getNameAndVersion = setupGetNameAndVersion(getPackage);

  return {
    add: (packageJson, arg) => {
      return getNameAndVersion(arg)
        .then(({name, version}) => {
          let result = packageJson;
          if (packageJson.devDependencies) {
            result = set(packageJson, 'devDependencies',
              without(packageJson.devDependencies, name));
          }
          return setIn(result, ['dependencies', name], version);
        });
    },
    addDev: (packageJson, arg) => {
      const {name} = npa(arg);

      if (name && getIn(packageJson, ['dependencies', name])) {
        return Promise.reject(new Error(`"${name}" is already in dependencies`));
      }

      return getNameAndVersion(arg)
        .then(({name, version}) =>
          setIn(packageJson, ['devDependencies', name], version));
    },
    remove: (packageJson, packageName) => {
      let result = packageJson;

      if (packageJson.dependencies) {
        result = set(result, 'dependencies',
          without(packageJson.dependencies, packageName));
      }

      if (packageJson.devDependencies) {
        result = set(result, 'devDependencies',
          without(packageJson.devDependencies, packageName));
      }

      return result;
    }
  };
};

module.exports = inject(_getPackage);
module.exports.inject = inject;
