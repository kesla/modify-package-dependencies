import test from 'tapava';
import {inject} from './lib';

test('add() @^version', function * (t) {
  const getPackage = function (arg) {
    t.is(arg, 'packageName');
    return Promise.resolve({
      name: 'packageName',
      version: '1.2.3'
    });
  };

  const {add} = inject(getPackage);

  const actual = yield add(Object.freeze({}), 'packageName');
  const expected = {
    dependencies: {
      packageName: '^1.2.3'
    }
  };
  t.deepEqual(actual, expected);
});

test('add() @latest', function * (t) {
  const getPackage = function (arg) {
    t.is(arg, 'packageName@latest');
    return Promise.resolve({
      name: 'packageName',
      version: '1.2.3'
    });
  };

  const {add} = inject(getPackage);

  const actual = yield add(Object.freeze({}), 'packageName@latest');
  const expected = {
    dependencies: {
      packageName: '^1.2.3'
    }
  };
  t.deepEqual(actual, expected);
});

test('add() @*', function * (t) {
  const getPackage = function (arg) {
    t.is(arg, 'packageName@*');
    return Promise.resolve({
      name: 'packageName',
      version: '1.2.3'
    });
  };

  const {add} = inject(getPackage);

  const actual = yield add(Object.freeze({}), 'packageName@*');
  const expected = {
    dependencies: {
      packageName: '*'
    }
  };
  t.deepEqual(actual, expected);
});

test('add() @exact', function * (t) {
  const getPackage = function (arg) {
    t.is(arg, 'packageName@1.2.1');
    return Promise.resolve({
      name: 'packageName',
      version: '1.2.1'
    });
  };

  const {add} = inject(getPackage);

  const actual = yield add(Object.freeze({}), 'packageName@1.2.1');
  const expected = {
    dependencies: {
      packageName: '1.2.1'
    }
  };
  t.deepEqual(actual, expected);
});

test('add() @~version', function * (t) {
  const getPackage = function (arg) {
    t.is(arg, 'packageName@~1.2.1');
    return Promise.resolve({
      name: 'packageName',
      version: '1.2.3'
    });
  };

  const {add} = inject(getPackage);

  const actual = yield add(Object.freeze({}), 'packageName@~1.2.1');
  const expected = {
    dependencies: {
      packageName: '~1.2.1'
    }
  };
  t.deepEqual(actual, expected);
});

test('add() github link', function * (t) {
  const getPackage = function (arg) {
    t.is(arg, 'user/repo#tag');
    return Promise.resolve({
      name: 'packageName'
    });
  };

  const {add} = inject(getPackage);

  const actual = yield add(Object.freeze({}), 'user/repo#tag');
  const expected = {
    dependencies: {
      packageName: 'github:user/repo#tag'
    }
  };
  t.deepEqual(actual, expected);
});
