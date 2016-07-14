import test from 'tapava';
import {inject} from '../lib';

test('.args', t => {
  const _packages = {
    add1: '1',
    add2: '2',
    addDev1: '3',
    addDev2: '4'
  };
  const getPackage = arg => Promise.resolve(_packages[arg]);
  const packageJson = Object.freeze({
    dependencies: {
      keep1: '1',
      remove1: '1'
    },
    devDependencies: {
      keep2: '1',
      remove2: '2'
    }
  });
  const expected = {
    dependencies: {
      keep1: '1',
      add1: '1',
      add2: '2'
    },
    devDependencies: {
      keep2: '1',
      addDev1: '3',
      addDev2: '4'
    }
  };
  const {args} = inject(getPackage);

  args('--add add1 --add-dev add-dev1 --remove remove1 -p add2 -d add-dev2 -r remove2'.split(' '))
    .then(actual => {
      t.deepEqual(actual, expected);
    });
});
