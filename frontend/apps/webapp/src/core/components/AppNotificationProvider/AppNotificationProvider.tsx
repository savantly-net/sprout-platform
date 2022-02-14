import { AppNotification, AppNotificationSeverity, eventNotification } from '@savantly/sprout-api';
import { Icon, ThemeColor } from '@sprout-platform/ui';
import { css, cx } from 'emotion';
/* eslint-disable */
import React, { FC, Fragment, useEffect, useMemo } from 'react';
/* eslint-enable */
import { useDispatch, useSelector } from 'react-redux';
import { UncontrolledAlert } from 'reactstrap';
import { useBus } from 'ts-bus/react';
import { StoreState } from '../../../types';
import { clearAppNotification, notifyApp } from '../../actions';

export const AppNotificationProvider: FC = (props) => {
  const bus = useBus();
  const dispatch = useDispatch();
  const appNotifications = useSelector((state: StoreState) => state.appNotifications.appNotifications);

  useEffect(() => {
    bus.subscribe(eventNotification, (event) => {
      switch (event.type) {
        case 'notification.created':
          dispatch(notifyApp(event.payload));
      }
    });
  }, [dispatch, bus]);

  useMemo(() => {
    appNotifications.forEach((n) => {
      setTimeout(() => {
        dispatch(clearAppNotification(n.id));
      }, n.timeout);
    });
  }, [dispatch,appNotifications]);

  const determineColor = (severity: AppNotificationSeverity): ThemeColor => {
    switch (severity) {
      case AppNotificationSeverity.Error:
        return 'danger';
      case AppNotificationSeverity.Info:
        return 'info';
      case AppNotificationSeverity.Warning:
        return 'warning';
      default:
        return 'success';
    }
  };

  const determineStyle = (notification: AppNotification) => {
    return cx(
      css`
        position: fixed;
        z-index: 9999;
        v-align: middle;
      `,
      'top-right'
    );
  };

  const showToast = (notification: AppNotification) => {
    return (
      <div key={notification.id} className={determineStyle(notification)}>
        <UncontrolledAlert
          className={css`
            box-shadow: 0 0 12px #ccc;
          `}
          color={determineColor(notification.severity)}
          title={notification.title}
        >
          <div className="row">
            <Icon className="mr-1" name={notification.icon} />
            {notification.component || notification.text}
          </div>
        </UncontrolledAlert>
      </div>
    );
  };

  return (
    <Fragment>
      {appNotifications.map((n) => showToast(n))} {props.children}
    </Fragment>
  );
};
