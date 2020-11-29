import { navIndexReducer as navIndex } from '../../features/navigation/navModel';
import { appNotificationsReducer as appNotifications } from './appNotification';
import { applicationReducer as application } from './application';
import { authenticationReducer as authentication } from './authentication'

export default {
  navIndex,
  appNotifications,
  application,
  authentication
};
