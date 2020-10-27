const fs = require('fs');
const path = require('path');

//const __dirname = fs.realpathSync('.');

const pkgPath = path.join(__dirname, 'package.json');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const savePackage = (
    'Updating package.json',
    // @ts-ignore
    async ({ path, pkg }) => {
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
  
  const preparePackage = async (pkg) => {
    pkg.main = 'index.development.js';
    pkg.types = 'index.d.ts';
  
    await savePackage({
      path: `${__dirname}/dist/package.json`,
      pkg,
    });
  };

preparePackage(pkg);