# modify-package-dependencies

> Modify dependencies to a package.json-file - simlar to what \&#34;npm install --save[-dev]\&#34; or \&#34;npm uninstall --save[-dev]\&#34; does (without the actual [un]installing)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

```
npm install modify-package-dependencies [-g]
```

## Usage

### module

```js

import {add, addDev, remove} from 'modify-package-dependencies';

const packageJson1 = {
  dependencies: {
    package1: '^2.1.3'
  },
  devDependencies: {
    package2: '^7.0.1'
  }
}

add(packageJson1, ['package1@1', 'package2', 'github/arg#branch'])
  .then(updatedPackageJson => {
    console.log('updated package json', updatedPackageJson);
    console.log('updatedPackageJson does not have package2 as a dev dependency anymore');
    console.log('since that has now been updated to a dependency. Neat');
  });

addDev(packageJson1, ['devPackage1@1'])
  .then(updatedPackageJson => {
    console.log('updated package json w a dev dependency', updatedPackageJson);
  })

addDev(packageJson1, ['package1'])
  .catch(err => {
    console.log('this errored since package1 is a dependency.');
    console.kog('a dependency can not be downgraded to a dev dependency');
    console.log('and dependencies in both dependencies & devDependencies is not allowed');
  })

const updatedPackageJson = remove(packageJson1, ['package1', 'package2']);
console.log(updatedPackageJson);
console.log('remove does not care if it is a dependency or a dev dependency');
console.log('is just removes it!');
```

### cli

The cli updates the current package.json file, in the current directory.

```shell
modify-package-dependencies --add package1@1 --add package2 --add github/arg#branch
modify-package-dependencies -p package1@1 -p package2 -p github/arg#branch
# the two above are equivalent

modify-package-dependencies --add-dev devPackage1@1
modify-package-dependencies -d devPackage1@1
# the two above are equivalent

modify-package-dependencies --remove package1 --remove package2
modify-package-dependencies -r package1 -r package2
# the two above are equivalent
```

## Contribute

PRs accepted.

Small note: If editing the Readme, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © David Björklund
