import find from 'lodash.find';
import {getIn, setIn} from 'immutable-object-methods';

export default getNameAndVersion => (packageJson, args) =>
  Promise.all(args.map(getNameAndVersion))
    .then(rows => {
      const errorRow = find(rows, ({name}) => {
        return getIn(packageJson, ['dependencies', name]);
      });

      if (errorRow) {
        return Promise.reject(new Error(`"${errorRow.name}" is already in dependencies`));
      }

      let result = packageJson;
      rows.forEach(({name, version}) => {
        result = setIn(result, ['devDependencies', name], version);
      });
      return Promise.resolve(result);
    });
