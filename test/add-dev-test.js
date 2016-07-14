import test from 'tapava';
import {inject} from '../lib';

test('addDev() default', function * (t) {
  const getPackage = function (arg) {
    t.is(arg, 'packageName');
    return Promise.resolve({
      name: 'packageName',
      version: '1.2.3'
    });
  };

  const {addDev} = inject(getPackage);

  const actual = yield addDev(Object.freeze({}), 'packageName');
  const expected = {
    devDependencies: {
      packageName: '^1.2.3'
    }
  };
  t.deepEqual(actual, expected);
});

test('addDev() when package already is in dependencies', function * (t) {
  t.plan(1);
  const getPackage = () => {
    throw new Error('should not be called');
  };

  const {addDev} = inject(getPackage);

  yield addDev(Object.freeze({
    dependencies: {
      packageName: '*'
    }
  }), 'packageName')
    .catch(err => {
      t.is(err.message, '"packageName" is already in dependencies');
    });
});
