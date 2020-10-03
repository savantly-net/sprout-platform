import { navIndexReducer as navIndex } from './navModel';
import { locationReducer as location } from './location';
import { appNotificationsReducer as appNotifications } from './appNotification';
import { applicationReducer as application } from './application';
import { authenticationReducer as authentication } from './authentication'

export default {
  navIndex,
  location,
  appNotifications,
  application,
  authentication
};
