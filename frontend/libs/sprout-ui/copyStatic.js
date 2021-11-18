const fs = require('fs');
const path = require('path');
const globby = require('globby');


const moveStaticFiles = async () => {

    const posixCwd = path.posix.normalize(__dirname, '.').replace(/\\/g, '/');
    console.log(`cwd: ${posixCwd}`);

    const globPattern = path.posix.join(posixCwd, 'src', '**', '*.+(png|svg|gif|jpg)');

    console.log(`globPattern: ${globPattern}`);
    const staticFiles = await globby(globPattern);
    console.log(`copying static files ${staticFiles}`);
    const promises = staticFiles.map(file => {
        return new Promise((resolve, reject) => {
            fs.copyFile(file, `${posixCwd}/compiled/${file.replace(`${posixCwd}/src`, '')}`, (err) => {
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

moveStaticFiles();