// import { Button, HorizontalGroup, Icon, VerticalGroup } from '@savantly/sprout-ui';
import { Button,HorizontalGroup, Icon, VerticalGroup } from '@sprout-platform/ui';
// import { Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Toast } from 'reactstrap';
import { getMessageFromError } from '../../../core/utils/errors';
import { DashboardInitError, DashboardInitPhase, DashboardRouteInfo, StoreState } from '../../../types';
import { DashboardModel } from '../state/DashboardModel';
import { initDashboard } from '../state/initDashboard';
import DashboardPage from './DashboardPage'; /* webpackChunkName: "DashboardPage" */

type OwnProps = {
  routeInfo?: DashboardRouteInfo;
};

type StateProps = {
  dashboard: DashboardModel | null;
  initPhase: DashboardInitPhase;
  isInitSlow: boolean;
  initError: DashboardInitError | null;
};

type DispatchProps = {
  initDashboard: Function;
};

type AllProps = OwnProps & StateProps & DispatchProps;

const mapStateToProps = (state: StoreState): StateProps => ({
  initPhase: state.dashboard.initPhase,
  isInitSlow: state.dashboard.isInitSlow,
  initError: state.dashboard.initError,
  dashboard: state.dashboard.getModel() as DashboardModel
});

const mapDispatchToProps: DispatchProps = {
  initDashboard
};

const DashboardProvider = ({ routeInfo, initDashboard, initError, initPhase, isInitSlow }: AllProps) => {
  console.log('DashboardProvider entered');
  const params = useParams();
  const navigate = useNavigate();
  const uid = params['uid'];

  useEffect(() => {
    initDashboard({
      fixUrl: true,
      routeInfo: routeInfo,
      urlUid: uid, //this.props.urlUid ? this.props.urlUid as string : undefined,
      urlFolderId: undefined, // this.props.urlFolderId ? this.props.urlFolderId as string : undefined,
      navigate
    });
  }, [uid, initDashboard, routeInfo, navigate]);

  const cancelVariables = () => {
    //props.updateLocation({ path: '/' });
  };

  const renderSlowInitState = () => {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-loading__text">
          <VerticalGroup spacing="md">
            <HorizontalGroup align="center" justify="center" spacing="xs">
              <Icon name="fa fa-spinner" className="fa-spin" /> {initPhase}
            </HorizontalGroup>{' '}
            <HorizontalGroup align="center" justify="center">
              {/* <Button variant="secondary" size="md" icon="repeat" onClick={cancelVariables}> */}
              <Button size="md" icon="repeat" onClick={cancelVariables}>
                Cancel loading dashboard
              </Button>
            </HorizontalGroup>
          </VerticalGroup>
        </div>
      </div>
    );
  };

  const renderInitFailedState = () => {
    if (!initError) {
      return null;
    }

    return (
      <div className="dashboard-loading">
        <Toast title={initError.message} color="danger">
          {getMessageFromError(initError.error)}
        </Toast>
      </div>
    );
  };

  return (
    <div>
      {isInitSlow && renderSlowInitState()}
      {initError && renderInitFailedState()}
      <div>
        <DashboardPage />
      </div>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardProvider);
