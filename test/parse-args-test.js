import test from 'tapava';
import parseArgs from '../lib/parse-args';

test('parseArgs()', t => {
  const expected1 = {
    add: ['add1', 'add2'],
    addDev: ['add-dev1', 'add-dev2'],
    remove: ['remove1', 'remove2']
  };
  const actual1 = parseArgs('--add add1 --add-dev add-dev1 --remove remove1 -p add2 -d add-dev2 -r remove2'.split(' '));
  t.match(actual1, expected1);

  const expected2 = {
    add: ['add'],
    addDev: ['add-dev'],
    remove: ['remove']
  };
  const actual2 = parseArgs('--add add --add-dev add-dev --remove remove'.split(' '));
  t.match(actual2, expected2);

  const expected3 = {
    add: [],
    addDev: [],
    remove: []
  };
  const actual3 = parseArgs([]);
  t.match(actual3, expected3);
});
