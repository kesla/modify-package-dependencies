import npa from 'npm-package-arg';

export default getPackage => arg =>
  getPackage(arg).then(pkg => {
    const {type, hosted} = npa(arg);

    if (type === 'hosted') {
      return {
        name: pkg.name,
        version: hosted.shortcut
      };
    }

    return {
      name: pkg.name,
      version: `^${pkg.version}`
    };
  });
