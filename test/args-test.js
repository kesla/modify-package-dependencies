import test from 'tapava';
import {inject} from '../lib';

test('.args', t => {
  t.plan(1);
  const _packages = {
    'add1': {name: 'add1', version: '1'},
    'add2': {name: 'add2', version: '2'},
    'add-dev1': {name: 'add-dev1', version: '3'},
    'add-dev2': {name: 'add-dev2', version: '4'}
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
      add1: '^1',
      add2: '^2'
    },
    devDependencies: {
      'keep2': '1',
      'add-dev1': '^3',
      'add-dev2': '^4'
    }
  };
  const {args} = inject(getPackage);
  const inputArgs = '--add add1 --add-dev add-dev1 --remove remove1 -p add2 -d add-dev2 -r remove2';

  return args(packageJson, inputArgs.split(' '))
    .then(actual => {
      t.deepEqual(actual, expected);
    });
});
