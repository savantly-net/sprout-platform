// @ts-ignore
import chalk from 'chalk';
import program from 'commander';
import { componentCreateTask } from './tasks/component.create';
import { pluginBuildTask } from './tasks/plugin.build';
import { pluginCreateTask } from './tasks/plugin.create';
import { pluginDevTask } from './tasks/plugin.dev';
import { pluginTestTask } from './tasks/plugin.tests';
import { bundleManagedTask } from './tasks/plugin/bundle.managed';
import { precommitTask } from './tasks/precommit';
import { templateTask } from './tasks/template';
import { toolkitBuildTask } from './tasks/toolkit.build';
import { execTask } from './utils/execTask';

export const run = (includeInternalScripts = false) => {
  if (includeInternalScripts) {
    program.option('-d, --deprecate <scripts>', 'Inform about npm script deprecation', v => v.split(','));

    program
      .command('precommit')
      .description('Executes checks')
      .action(async cmd => {
        await execTask(precommitTask)({});
      });

    program
      .command('debug:template')
      .description('Just testing')
      .action(async cmd => {
        await execTask(templateTask)({});
      });

    program
      .command('toolkit:build')
      .description('Prepares savantly/sprout-toolkit dist package')
      .action(async cmd => {
        await execTask(toolkitBuildTask)({});
      });

    // React generator
    program
      .command('component:create')
      .description(
        'Scaffold React components. Optionally add test, story and .mdx files. The components are created in the same dir the script is run from.'
      )
      .action(async () => {
        await execTask(componentCreateTask)({});
      });
  }

  program
    .command('plugin:create [name]')
    .description('Creates plugin from template')
    .action(async cmd => {
      await execTask(pluginCreateTask)({ name: cmd, silent: true });
    });

  program
    .command('plugin:build')
    .description('Prepares plugin dist package')
    .action(async cmd => {
      await execTask(pluginBuildTask)({ coverage: false, silent: true });
    });

  program
    .command('plugin:dev')
    .option('-w, --watch', 'Run plugin development mode with watch enabled')
    .option('--yarnlink', 'symlink this project to the local grafana/toolkit')
    .description('Starts plugin dev mode')
    .action(async cmd => {
      await execTask(pluginDevTask)({
        watch: !!cmd.watch,
        yarnlink: !!cmd.yarnlink,
        silent: true,
      });
    });

  program
    .command('plugin:test')
    .option('-u, --updateSnapshot', 'Run snapshots update')
    .option('--coverage', 'Run code coverage')
    .option('--watch', 'Run tests in interactive watch mode')
    .option('--testPathPattern <regex>', 'Run only tests with a path that matches the regex')
    .option('--testNamePattern <regex>', 'Run only tests with a name that matches the regex')
    .description('Executes plugin tests')
    .action(async cmd => {
      await execTask(pluginTestTask)({
        updateSnapshot: !!cmd.updateSnapshot,
        coverage: !!cmd.coverage,
        watch: !!cmd.watch,
        testPathPattern: cmd.testPathPattern,
        testNamePattern: cmd.testNamePattern,
        silent: true,
      });
    });

  program
    .command('plugin:bundle-managed')
    .description('Builds managed plugins')
    .action(async cmd => {
      await execTask(bundleManagedTask)({});
    });

  program.on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
  });

  program.parse(process.argv);

  if (program.deprecate && program.deprecate.length === 2) {
    console.log(
      chalk.yellow.bold(
        `[NPM script depreciation] ${program.deprecate[0]} is deprecated! Use ${program.deprecate[1]} instead!`
      )
    );
  }
};
