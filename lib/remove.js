import {set, without} from 'immutable-object-methods';

export default (packageJson, packageNames) => {
  let result = packageJson;

  if (result.dependencies) {
    packageNames.forEach(packageName => {
      result = set(result, 'dependencies',
        without(result.dependencies, packageName));
    });
  }

  if (result.devDependencies) {
    packageNames.forEach(packageName => {
      result = set(result, 'devDependencies',
        without(result.devDependencies, packageName));
    });
  }

  return result;
};
