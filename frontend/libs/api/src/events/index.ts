// events.ts
import { createEventDefinition, EventBus } from 'ts-bus';
import { AppNotification } from '../notification';

export const eventBus = new EventBus();

export const eventNotification = createEventDefinition<AppNotification>()('notification.created');
