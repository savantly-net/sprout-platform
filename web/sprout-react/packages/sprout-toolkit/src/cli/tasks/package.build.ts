import execa = require('execa');
// @ts-ignore
import * as fs from 'fs';
// @ts-ignore
import * as path from 'path';
import { resolve as resolvePath } from 'path';
import chalk from 'chalk';
import { useSpinner } from '../utils/useSpinner';
import { Task, TaskRunner } from './task';
import globby from 'globby';

let distDir: string, cwd: string;

// @ts-ignore
export const clean = useSpinner<void>('Cleaning', async () => await execa('npm', ['run', 'clean']));

// @ts-ignore
const compile = useSpinner<void>('Compiling sources', () => execa('tsc', ['-p', './tsconfig.build.json']));

// @ts-ignore
const rollup = useSpinner<void>('Bundling', () => execa('npm', ['run', 'bundle']));

interface SavePackageOptions {
  path: string;
  pkg: {};
}

const isUIPackage = (pkg: any) => {
  const _isUiPkg = pkg.name.endsWith('ui');
  if(_isUiPkg){
    console.log(chalk.green(`${pkg.name} is a UI package`));
  } else {
    console.log(chalk.yellow(`${pkg.name} not a UI package`));
  }
  
 return _isUiPkg
}

// @ts-ignore
export const savePackage = useSpinner<SavePackageOptions>(
  'Updating package.json',
  // @ts-ignore
  async ({ path, pkg }: SavePackageOptions) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(pkg, null, 2), err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
);

const preparePackage = async (pkg: any) => {
  pkg.main = 'index.js';
  pkg.types = 'index.d.ts';

  const version: string = pkg.version;
  const name: string = pkg.name;
  const deps: any = pkg.dependencies;

  // Below we are adding cross-dependencies to Sprout's packages
  // with the version being published
  if (name.endsWith('/sprout-ui')) {
    deps['@savantly/sprout-api'] = version;
  } else if (name.endsWith('/sprout-runtime')) {
    deps['@savantly/sprout-api'] = version;
    deps['@savantly/sprout-ui'] = version;
  } else if (name.endsWith('/sprout-toolkit')) {
    deps['@savantly/sprout-api'] = version;
    deps['@savantly/sprout-ui'] = version;
  }

  await savePackage({
    path: `${cwd}/dist/package.json`,
    pkg,
  });
};

const moveFiles = () => {
  const files = ['README.md', 'CHANGELOG.md', 'index.js'];

  // @ts-ignore
  return useSpinner<void>(`Moving ${files.join(', ')} files`, async () => {
    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        if (fs.existsSync(`${cwd}/${file}`)) {
          fs.copyFile(`${cwd}/${file}`, `${distDir}/${file}`, err => {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          });
        } else {
          console.log(chalk.yellow(`warning: ${cwd}/${file} doesn't exist`));
          resolve();
        }
      });
    });

    await Promise.all(promises);
  })();
};

const moveStaticFiles = async (pkg: any, cwd: string) => {
  if (isUIPackage(pkg)) {
    const staticFiles = await globby(resolvePath(process.cwd(), 'src/**/*.+(png|svg|gif|jpg)'));
    return useSpinner<void>(`Moving static files`, async () => {
      const promises = staticFiles.map(file => {
        return new Promise((resolve, reject) => {
          fs.copyFile(file, `${cwd}/compiled/${file.replace(`${cwd}/src`, '')}`, (err: any) => {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          });
        });
      });

      await Promise.all(promises);
    })();
  }
};
interface PackageBuildOptions {
  scope: string;
}

const buildTaskRunner: TaskRunner<PackageBuildOptions> = async ({ scope }) => {
  if (!scope) {
    throw new Error('Provide packages with -s, --scope <packages>');
  }

  const scopes = scope.split(',').map(s => {
    return async () => {
      cwd = path.resolve(__dirname, `../../../../${s}`);
      // Lerna executes this in package's dir context, but for testing purposes I want to be able to run from root:
      // sprout-toolkit package:build --scope=<package>
      process.chdir(cwd);
      distDir = `${cwd}/dist`;
      const pkg = require(`${cwd}/package.json`);
      console.log(chalk.yellow(`Building ${pkg.name} (package.json version: ${pkg.version})`));

      await clean();
      await compile();
      await moveStaticFiles(pkg, cwd);
      await rollup();
      await preparePackage(pkg);
      await moveFiles();
    };
  });

  await Promise.all(scopes.map(s => s()));
};

export const buildPackageTask = new Task<PackageBuildOptions>('Package build', buildTaskRunner);
