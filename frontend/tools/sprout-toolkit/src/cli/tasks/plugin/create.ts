import chalk from 'chalk';
import commandExists from 'command-exists';
import { promises as fs, readFileSync } from 'fs';
import { prompt } from 'inquirer';
import kebabCase from 'lodash/kebabCase';
import path from 'path';
import gitPromise from 'simple-git/promise';
import { promptConfirm, promptInput } from '../../utils/prompt';
import { rmdir } from '../../utils/rmdir';
import { useSpinner } from '../../utils/useSpinner';

const simpleGit = gitPromise(process.cwd());

interface PluginDetails {
  name: string;
  org: string;
  description: string;
  author: boolean | string;
  url: string;
  keywords: string;
}

type PluginType = 'panel-plugin' | 'app-module';

const PluginNames: Record<PluginType, string> = {
  'panel-plugin': 'Sprout Panel Plugin',
  'app-module': 'Sprout App Module'
};
const RepositoriesPaths: Record<PluginType, string> = {
  'panel-plugin': 'https://github.com/savantly-net/simple-sprout-panel.git',
  'app-module': 'https://github.com/savantly-net/sprout-simple-app-module.git'
};
const TutorialPaths: Record<PluginType, string> = {
  'panel-plugin': 'https://grafana.com/tutorials/build-a-panel-plugin',
  'app-module': 'https://github.comsavantly-net/sprout-simple-app-module'
};

export const getGitUsername = async () => {
  const name = await simpleGit.raw(['config', '--global', 'user.name']);
  return name || '';
};
export const getPluginIdFromName = (name: string) => kebabCase(name);
export const getPluginId = (pluginDetails: PluginDetails) =>
  `${kebabCase(pluginDetails.org)}-${getPluginIdFromName(pluginDetails.name)}`;

export const getPluginKeywords = (pluginDetails: PluginDetails) =>
  pluginDetails.keywords
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k !== '');

export const verifyGitExists = async () => {
  return new Promise((resolve, reject) => {
    commandExists('git', (err, exists) => {
      if (exists) {
        resolve(true);
      }
      reject(new Error('git is not installed'));
    });
  });
};

export const promptPluginType = async () =>
  prompt<{ type: PluginType }>([
    {
      type: 'list',
      message: 'Select plugin type',
      name: 'type',
      choices: [
        { name: 'Panel Plugin [client]', value: 'panel-plugin' },
        { name: 'App Module [client+api]', value: 'app-module' }
      ]
    }
  ]);

export const promptPluginDetails = async (name?: string) => {
  const username = (await getGitUsername()).trim();
  const responses = await prompt<PluginDetails>([
    promptInput('name', 'Plugin name', true, name),
    promptInput('org', 'Organization (used as part of plugin ID)', true),
    promptInput('description', 'Description'),
    promptInput('keywords', 'Keywords (separated by comma)'),
    // Try using git specified username
    promptConfirm('author', `Author (${username})`, username, username !== ''),
    // Prompt for manual author entry if no git user.name specified
    promptInput('author', `Author`, true, undefined, (answers: any) => !answers.author || username === ''),
    promptInput('url', 'Your URL (i.e. organization url)')
  ]);

  return {
    ...responses,
    author: responses.author === true ? username : responses.author
  };
};

export const fetchTemplate = useSpinner<{ type: PluginType; dest: string }>(
  'Fetching plugin template...',
  async ({ type, dest }) => {
    const url = RepositoriesPaths[type];
    if (!url) {
      throw new Error('Unknown plugin type');
    }

    await simpleGit.clone(url, dest);
  }
);

export const prepareJsonFiles = useSpinner<{ type: PluginType; pluginDetails: PluginDetails; pluginPath: string }>(
  'Saving package.json and plugin.json files',
  async ({ type, pluginDetails, pluginPath }) => {
    const packageJsonPath = path.resolve(pluginPath, 'package.json');
    const pluginJsonPath = path.resolve(pluginPath, 'src/plugin.json');
    const packageJson: any = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    const pluginJson: any = JSON.parse(readFileSync(pluginJsonPath, 'utf8'));

    const pluginId = `${kebabCase(pluginDetails.org)}-${getPluginIdFromName(pluginDetails.name)}`;
    packageJson.name = pluginId;
    packageJson.author = pluginDetails.author;
    packageJson.description = pluginDetails.description;

    pluginJson.name = pluginDetails.name;
    pluginJson.id = pluginId;

    pluginJson.info = {
      ...pluginJson.info,
      description: pluginDetails.description,
      author: {
        name: pluginDetails.author,
        url: pluginDetails.url
      },
      keywords: getPluginKeywords(pluginDetails)
    };

    await Promise.all(
      [packageJson, pluginJson].map((f, i) => {
        const filePath = i === 0 ? packageJsonPath : pluginJsonPath;
        return fs.writeFile(filePath, JSON.stringify(f, null, 2));
      })
    );
  }
);

export const removeGitFiles = useSpinner('Cleaning', async (pluginPath) =>
  rmdir(`${path.resolve(pluginPath, '.git')}`)
);

/* eslint-disable no-console */
export const formatPluginDetails = (details: PluginDetails) => {
  console.group();
  console.log();
  console.log(chalk.bold.yellow('Your plugin details'));
  console.log('---');
  console.log(chalk.bold('Name: '), details.name);
  console.log(chalk.bold('ID: '), getPluginId(details));
  console.log(chalk.bold('Description: '), details.description);
  console.log(chalk.bold('Keywords: '), getPluginKeywords(details));
  console.log(chalk.bold('Author: '), details.author);
  console.log(chalk.bold('Organization: '), details.org);
  console.log(chalk.bold('Website: '), details.url);
  console.log();
  console.groupEnd();
};

export const printGrafanaTutorialsDetails = (type: PluginType) => {
  console.group();
  console.log();
  console.log(chalk.bold.yellow(`Congrats! You have just created ${PluginNames[type]}.`));
  console.log();
  console.log(`${PluginNames[type]} tutorial: ${TutorialPaths[type]}`);
  console.log(
    'Learn more about Grafana Plugins at https://grafana.com/docs/grafana/latest/plugins/developing/development/'
  );
  console.log();
  console.groupEnd();
};
/* eslint-enable no-console */
