import _getPackage from 'get-pkg-json';
import {setIn} from 'immutable-object-methods';
import npa from 'npm-package-arg';

const setupAdd = (getPackage, dependencyType) => (packageJson, arg) => {
  return getPackage(arg).then(pkg => {
    const {type, rawSpec, hosted} = npa(arg);

    if (type === 'hosted') {
      return setIn(packageJson, [dependencyType, pkg.name], hosted.shortcut);
    }

    if (type === 'range') {
      return setIn(packageJson, [dependencyType, pkg.name], rawSpec);
    }

    if (type === 'version') {
      return setIn(packageJson, [dependencyType, pkg.name], pkg.version);
    }

    return setIn(packageJson, ['dependencies', pkg.name], `^${pkg.version}`);
  });
};

const inject = getPackage => ({
  add: setupAdd(getPackage, 'dependencies')
});

module.exports = inject(_getPackage);
module.exports.inject = inject;
