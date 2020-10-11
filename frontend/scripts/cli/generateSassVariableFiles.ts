import * as fs from 'fs';
import darkTheme from '../../../web/sprout-react_old/packages/sprout-ui/src/themes/dark';
import lightTheme from '../../../web/sprout-react_old/packages/sprout-ui/src/themes/light';
import defaultTheme from '../../../web/sprout-react_old/packages/sprout-ui/src/themes/default';
import { darkThemeVarsTemplate } from '../../../web/sprout-react_old/packages/sprout-ui/src/themes/_variables.dark.scss.tmpl';
import { lightThemeVarsTemplate } from '../../../web/sprout-react_old/packages/sprout-ui/src/themes/_variables.light.scss.tmpl';
import { commonThemeVarsTemplate } from '../../../web/sprout-react_old/packages/sprout-ui/src/themes/_variables.scss.tmpl';

const darkThemeVariablesPath = __dirname + '/../../packages/webapp/src/sass/_variables.dark.generated.scss';
const lightThemeVariablesPath = __dirname + '/../../packages/webapp/src/sass/_variables.light.generated.scss';
const defaultThemeVariablesPath = __dirname + '/../../packages/webapp/src/sass/_variables.generated.scss';

const writeVariablesFile = async (path: string, data: string) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, e => {
      if (e) {
        reject(e);
      } else {
        resolve(data);
      }
    });
  });
};

const generateSassVariableFiles = async () => {
  try {
    await Promise.all([
      writeVariablesFile(darkThemeVariablesPath, darkThemeVarsTemplate(darkTheme)),
      writeVariablesFile(lightThemeVariablesPath, lightThemeVarsTemplate(lightTheme)),
      writeVariablesFile(defaultThemeVariablesPath, commonThemeVarsTemplate(defaultTheme)),
    ]);
    console.log('\nSASS variable files generated');
  } catch (error) {
    console.error('\nWriting SASS variable files failed', error);
    process.exit(1);
  }
};

generateSassVariableFiles();
