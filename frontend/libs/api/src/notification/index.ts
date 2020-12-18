import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export enum AppNotificationSeverity {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info'
}

export enum AppNotificationTimeout {
  Warning = 5000,
  Success = 3000,
  Error = 7000
}

export interface AppNotification {
  id: any;
  severity: AppNotificationSeverity;
  icon: string;
  title: string;
  text: string;
  component?: React.ReactElement;
  timeout: AppNotificationTimeout;
}

const defaultSuccessNotification = {
  title: '',
  text: '',
  severity: AppNotificationSeverity.Success,
  icon: 'check',
  timeout: AppNotificationTimeout.Success,
};

const defaultWarningNotification = {
  title: '',
  text: '',
  severity: AppNotificationSeverity.Warning,
  icon: 'exclamation-triangle',
  timeout: AppNotificationTimeout.Warning,
};

const defaultErrorNotification = {
  title: '',
  text: '',
  severity: AppNotificationSeverity.Error,
  icon: 'exclamation-triangle',
  timeout: AppNotificationTimeout.Error,
};

export const createSuccessNotification = (title: string, text = ''): AppNotification => ({
  ...defaultSuccessNotification,
  title: title,
  text: text,
  id: uuidv4(),
});

export const createErrorNotification = (
  title: string,
  text: string | Error = '',
  component?: React.ReactElement
): AppNotification => {
  return {
    ...defaultErrorNotification,
    text: getMessageFromError(text),
    title,
    id: uuidv4(),
    component,
  };
};

export const createWarningNotification = (title: string, text = ''): AppNotification => ({
  ...defaultWarningNotification,
  title: title,
  text: text,
  id: uuidv4(),
});

function getMessageFromError(err: string | (Error & { data?: any; statusText?: string })): string {
  if (err && !_.isString(err)) {
    if (err.message) {
      return err.message;
    } else if (err.data && err.data.message) {
      return err.data.message;
    } else if (err.statusText) {
      return err.statusText;
    } else {
      return JSON.stringify(err);
    }
  }

  return err as string;
}