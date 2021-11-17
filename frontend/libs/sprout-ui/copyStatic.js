const fs = require('fs');
const path = require('path');
const globby = require('globby');

const pkgPath = path.join(__dirname, 'package.json');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const moveStaticFiles = async (pkg, cwd) => {
    const staticFiles = await globby(path.resolve(process.cwd(), 'src/**/*.+(png|svg|gif|jpg)'));
    const promises = staticFiles.map(file => {
        return new Promise((resolve, reject) => {
            fs.copyFile(file, `${cwd}/compiled/${file.replace(`${cwd}/src`, '')}`, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    });
    await Promise.all(promises);
};

cwd = path.resolve(__dirname, `.`);
moveStaticFiles(pkg, cwd);