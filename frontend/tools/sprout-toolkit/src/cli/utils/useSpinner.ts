import ora = require('ora');

type FnToSpin<T> = (options: T) => Promise<void>;

// pnpm detects console output as warnings, so we can suppress in CI
const suppressSpinner = process.env.SUPRESS_SPINNER;

class spinnerWrapper {
  spinner: any;
  constructor(spinnerLabel: string) {
    this.spinner = ora(spinnerLabel)
  }

  start() {
    if (suppressSpinner) {
      return;
    } else {
      this.spinner.start();
    }
  }

  succeed() {
    if (suppressSpinner) {
      return;
    } else {
      this.spinner.succeed();
    }
  }

  fail(error: any) {
    if (suppressSpinner) {
      return;
    } else {
      this.spinner.fail(error);
    }
  }
}

export const useSpinner = <T = any>(spinnerLabel: string, fn: FnToSpin<T>, killProcess = true) => {
  return async (options: T) => {
    const spinner = new spinnerWrapper(spinnerLabel);
    spinner.start();
    try {
      await fn(options);
      spinner.succeed();
    } catch (e) {
      console.trace(e); // eslint-disable-line no-console
      spinner.fail(e.message || e);
      if (killProcess) {
        process.exit(1);
      }
    }
  };
};
