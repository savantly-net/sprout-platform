const rushLib = require('@microsoft/rush-lib');
const yargs = require('yargs');

// TODO: use is-command-line for sprout toolkit
// https://github.com/microsoft/rushstack/blob/master/libraries/ts-command-line/README.md

// loadFromDefaultLocation() will search parent folders to find "rush.json" and then
// take care of parsing it and loading related config files.
const rushConfiguration = rushLib.RushConfiguration.loadFromDefaultLocation({
  startingFolder: process.cwd()
});

for (const project of rushConfiguration.projects) {
  console.log(project.packageName + ':');
  console.log('  ' + project.projectRelativeFolder);
}
