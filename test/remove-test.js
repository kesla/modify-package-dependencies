import test from 'tapava';
import {inject} from '../lib';

test('remove() when packages is in dependencies', t => {
  const getPackage = () => {
    throw new Error('should not be called');
  };

  const {remove} = inject(getPackage);
  const packageJson = Object.freeze({dependencies: {packageName: '1.2.3'}});
  const actual = remove(packageJson, ['packageName']);
  const expected = {
    dependencies: {}
  };
  t.deepEqual(actual, expected);
});

test('remove() when packages is in devDependencies', t => {
  const getPackage = () => {
    throw new Error('should not be called');
  };

  const {remove} = inject(getPackage);
  const packageJson = Object.freeze({devDependencies: {packageName: '1.2.3'}});
  const actual = remove(packageJson, ['packageName']);
  const expected = {
    devDependencies: {}
  };
  t.deepEqual(actual, expected);
});

test('remove() when packages is in devDependencies & dependencies', t => {
  const getPackage = () => {
    throw new Error('should not be called');
  };

  const {remove} = inject(getPackage);
  const packageJson = Object.freeze({
    dependencies: {packageName1: '1.2.3'},
    devDependencies: {packageName2: '2.3.4'}
  });
  const actual = remove(packageJson, ['packageName1', 'packageName2']);
  const expected = {
    dependencies: {},
    devDependencies: {}
  };
  t.deepEqual(actual, expected);
});
