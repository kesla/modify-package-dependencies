import parseArgs from './parse-args';

export default ({add, addDev, remove}) => (packageJson, args) => {
  const config = parseArgs(args);
  return Promise.resolve(remove(packageJson, config.remove))
    .then(result => add(result, config.add))
    .then(result => addDev(result, config.addDev));
};
