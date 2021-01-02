// events.ts
import { createEventDefinition, EventBus } from 'ts-bus';
import {
  AppNotification,
  createSuccessNotification,
  createWarningNotification,
  createErrorNotification
} from '../notification';

export const eventBus = new EventBus();

export const eventNotification = createEventDefinition<AppNotification>()('notification.created');

export const publishSuccessNotification = (title: string, text?: string) =>
  eventBus.publish(eventNotification(createSuccessNotification(title, text)));

export const publishWarningNotification = (title: string, text?: string) =>
  eventBus.publish(eventNotification(createWarningNotification(title, text)));

export const publishErrorNotification = (title: string, text?: string | Error, component?: React.ReactElement) =>
  eventBus.publish(eventNotification(createErrorNotification(title, text, component)));
