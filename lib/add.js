import {setIn, set, without} from 'immutable-object-methods';

export default getNameAndVersion => (packageJson, args) =>
  Promise.all(args.map(getNameAndVersion))
    .then(rows => {
      let result = packageJson;
      rows.forEach(({name, version}) => {
        if (packageJson.devDependencies) {
          result = set(result, 'devDependencies',
            without(packageJson.devDependencies, name));
        }
        result = setIn(result, ['dependencies', name], version);
      });
      return result;
    });
