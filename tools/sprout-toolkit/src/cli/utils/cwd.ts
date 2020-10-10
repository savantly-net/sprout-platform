const cwd = process.cwd();

export const changeCwdToApi = () => {
  process.chdir(`${cwd}/packages/api`);
  return process.cwd();
};

export const restoreCwd = () => {
  process.chdir(cwd);
};

type PackageId = 'api';

export const changeCwdToPackage = (scope: PackageId) => {
  try {
    process.chdir(`${cwd}/packages/${scope}`);
  } catch (e) {
    throw e;
  }

  return process.cwd();
};
