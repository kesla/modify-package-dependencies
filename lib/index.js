import _getPackage from 'get-pkg-json';

import setupGetNameAndVersion from './get-name-and-version';
import remove from './remove';
import setupAdd from './add';
import setupAddDev from './add-dev';
import setupArgs from './args';

const inject = getPackage => {
  const getNameAndVersion = setupGetNameAndVersion(getPackage);
  const add = setupAdd(getNameAndVersion);
  const addDev = setupAddDev(getNameAndVersion);
  const args = setupArgs({add, addDev, remove});

  return {
    add, addDev, args, remove
  };
};

module.exports = inject(_getPackage);
module.exports.inject = inject;
