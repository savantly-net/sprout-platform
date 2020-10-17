import {
  Alert,
  Button,
  HorizontalGroup,
  Icon,
  VerticalGroup
} from "@savantly/sprout-ui";
import React, {
  createRef,
  useEffect
} from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMessageFromError } from "../../../core/utils/errors";
import {
  AppNotificationSeverity,
  DashboardInitError,
  DashboardInitPhase,
  DashboardRouteInfo,
  StoreState
} from "../../../types";
import { DashboardModel } from "../state/DashboardModel";
import { initDashboard } from "../state/initDashboard";
import DashboardPage from "./DashboardPage"; /* webpackChunkName: "DashboardPage" */

//const DashboardPage = SafeDynamicImport(import(/* webpackChunkName: "DashboardPage" */ './DashboardPage'));


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

type OwnState = {
  showLoadingState: boolean;
};

const mapStateToProps = (state: StoreState): StateProps => ({
  initPhase: state.dashboard.initPhase,
  isInitSlow: state.dashboard.isInitSlow,
  initError: state.dashboard.initError,
  dashboard: state.dashboard.getModel() as DashboardModel,
});

const mapDispatchToProps: DispatchProps = {
  initDashboard,
};

const ref = createRef();

const DashboardProvider = ({
  routeInfo,
  initDashboard,
  initError,
  initPhase,
  isInitSlow
}: AllProps) => {

  console.log('DashboardProvider entered')
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    initDashboard({
      fixUrl: true,
      routeInfo: routeInfo,
      urlUid: params['uid'], //this.props.urlUid ? this.props.urlUid as string : undefined,
      urlFolderId: undefined, // this.props.urlFolderId ? this.props.urlFolderId as string : undefined,
      navigate
    });
  }, [params]);

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
            </HorizontalGroup>{" "}
            <HorizontalGroup align="center" justify="center">
              <Button
                variant="secondary"
                size="md"
                icon="repeat"
                onClick={cancelVariables}
              >
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
        <Alert
          severity={AppNotificationSeverity.Error}
          title={initError.message}
          children={getMessageFromError(initError.error)}
        />
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
