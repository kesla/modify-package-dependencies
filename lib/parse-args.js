import minimist from 'minimist';

const toArray = value =>
  Array.isArray(value) ? value : [value].filter(Boolean);

export default args => {
  const {add, addDev, remove} = minimist(args, {
    alias: {
      'p': 'add',
      'd': 'addDev',
      'r': 'remove',
      'add-dev': 'addDev'
    }
  });

  return {
    add: toArray(add),
    addDev: toArray(addDev),
    remove: toArray(remove)
  };
};
