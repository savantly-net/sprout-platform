// Libaries
import { textUtil } from '@savantly/sprout-api';
import { ModalsController } from '@savantly/sprout-ui';
import { css } from 'emotion';
import React, { FC, ReactNode, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
// Utils & Services
import { appEvents } from '../../../../core/app_events';
import { BackButton } from '../../../../core/components/BackButton/BackButton';
import { PrivateComponent } from '../../../../core/components/PrivateComponent/PrivateComponent';
import { CoreEvents } from '../../../../types';
// Types
import { DashboardModel } from '../../state';
import { SaveDashboardModalProxy } from '../SaveDashboard/SaveDashboardModalProxy';
// Components
import { DashNavButton } from './DashNavButton';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Form, Icon, FormField } from '@sprout-platform/ui';
import { dashboardService } from '../../../../features/dashboard/services/dashboardService';

export interface OwnProps {
  dashboard: DashboardModel;
  isFullscreen: boolean;
  onAddPanel: () => void;
}

interface DashNavButtonModel {
  show: (props: OwnProps) => boolean;
  component: FC<Partial<OwnProps>>;
  index?: number | 'end';
}

const customLeftActions: DashNavButtonModel[] = [];
const customRightActions: DashNavButtonModel[] = [];

export function addCustomLeftAction(content: DashNavButtonModel) {
  customLeftActions.push(content);
}

export function addCustomRightAction(content: DashNavButtonModel) {
  customRightActions.push(content);
}

const DashNav = (props: OwnProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // TODO: goto search?
  const onFolderNameClick = () => {
    setSearchParams(
      { open: 'true' },
      {
        state: {
          folder: 'current'
        }
      }
    );
  };

  const onClose = () => {
    setSearchParams({});
  };

  const onToggleTVMode = () => {
    appEvents.emit(CoreEvents.toggleKioskMode);
  };

  // const onOpenSettings = () => {
  //   setSearchParams({ editview: 'settings' });
  // };

  const onDashboardNameClick = () => {
    setSearchParams({ open: 'true' });
  };

  const addCustomContent = (actions: DashNavButtonModel[], buttons: ReactNode[]) => {
    actions.map((action, index) => {
      const Component = action.component;
      const element = <Component {...props} key={`button-custom-${index}`} />;
      typeof action.index === 'number' ? buttons.splice(action.index, 0, element) : buttons.push(element);
    });
  };

  const renderLeftActionsButton = () => {
    const { dashboard } = props;
    const { canStar, canShare, isStarred } = dashboard.meta;

    const buttons: ReactNode[] = [];
    if (canStar) {
      buttons.push(
        <DashNavButton
          tooltip="Mark as favorite"
          classSuffix="star"
          icon={isStarred ? 'favorite' : 'star'}
          iconType={isStarred ? 'mono' : 'default'}
          iconSize="lg"
          noBorder={true}
          key="button-star"
        />
      );
    }

    if (canShare) {
      buttons.push(
        <ModalsController key="button-share">
          {({ showModal, hideModal }: { showModal: Function; hideModal: Function }) => (
            <DashNavButton
              tooltip="Share dashboard"
              classSuffix="share"
              icon="share-alt"
              iconSize="lg"
              noBorder={true}
            />
          )}
        </ModalsController>
      );
    }

    addCustomContent(customLeftActions, buttons);
    return buttons;
  };

  const renderDashboardTitleSearchButton = () => {
    const { dashboard, isFullscreen } = props;

    const folderSymbol = css`
      margin-right: 0 4px;
    `;
    const mainIconClassName = css`
      margin-right: 8px;
      margin-bottom: 3px;
    `;

    const folderTitle = dashboard.meta.folderTitle;
    const haveFolder = (dashboard.meta.folderId ?? 0) > 0;

    return (
      <>
        <div>
          <div className="navbar-page-btn">
            {!isFullscreen && <Icon name="apps" size="lg" className={mainIconClassName} />}
            {haveFolder && (
              <>
                <a className="navbar-page-btn__folder" onClick={onFolderNameClick}>
                  {folderTitle} <span className={folderSymbol}>/</span>
                </a>
              </>
            )}
            <a onClick={onDashboardNameClick}>{dashboard.title}</a>
          </div>
        </div>
        <div className="navbar-buttons navbar-buttons--actions">{renderLeftActionsButton()}</div>
        <div className="navbar__spacer" />
      </>
    );
  };

  const renderBackButton = () => {
    return (
      <div className="navbar-edit">
        <BackButton surface="dashboard" onClick={onClose} />
      </div>
    );
  };
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [dahsboardData, setDahsboardData] = useState<any>();

  useMemo(() => {
    dashboardService
      .getDashboardByUid(props.dashboard.uid)
      .then((response) => {
        setDahsboardData(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dashboardService]);

  const renderRightActionsButton = () => {
    const { dashboard, onAddPanel } = props;
    const { canSave, showSettings } = dashboard.meta;
    const { snapshot } = dashboard;
    const snapshotUrl = snapshot && snapshot.originalUrl;

    const buttons: ReactNode[] = [];
    if (canSave) {
      buttons.push(
        <DashNavButton
          classSuffix="save"
          tooltip="Add panel"
          icon="panel-add"
          onClick={onAddPanel}
          iconType="mono"
          iconSize="xl"
          key="button-panel-add"
        />
      );
      buttons.push(
        <ModalsController key="button-save">
          {({ showModal, hideModal }: { showModal: Function; hideModal: Function }) => (
            <DashNavButton
              tooltip="Save dashboard"
              classSuffix="save"
              icon="save"
              onClick={() => {
                showModal(SaveDashboardModalProxy, {
                  dashboard,
                  onDismiss: hideModal
                });
              }}
            />
          )}
        </ModalsController>
      );
    }

    if (snapshotUrl) {
      buttons.push(
        <DashNavButton
          tooltip="Open original dashboard"
          classSuffix="snapshot-origin"
          href={textUtil.sanitizeUrl(snapshotUrl)}
          icon="link"
          key="button-snapshot"
        />
      );
    }

    if (showSettings) {
      buttons.push(
        <DashNavButton
          tooltip="Dashboard settings"
          classSuffix="settings"
          icon="cog"
          onClick={() => {
            toggle();
          }}
          key="button-settings"
        />
      );
    }

    addCustomContent(customRightActions, buttons);
    return buttons;
  };
  const { isFullscreen } = props;

  return (
    <>
      <PrivateComponent hasAnyAuthority={['ADMIN', 'DASHBOARD_EDIT']}>
        <div className="navbar">
          {isFullscreen && renderBackButton()}
          {renderDashboardTitleSearchButton()}

          <div className="navbar-buttons navbar-buttons--actions">{renderRightActionsButton()}</div>

          <div className="navbar-buttons navbar-buttons--tv">
            <DashNavButton tooltip="Cycle view mode" classSuffix="tv" icon="monitor" onClick={onToggleTVMode} />
          </div>
        </div>
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>{'Update Dashboard Name'}</ModalHeader>
        <ModalBody>
          <Form
            initialValues={{
              title: props?.dashboard?.title ? props?.dashboard?.title : null
            }}
            onSubmit={async (values: any, { resetForm }) => {
              // props.dashboard.title = values.title;
              dahsboardData.dashboard.title = values.title;

              dashboardService
                .UpdateDashboards({
                  dashboard: dahsboardData.dashboard,
                  meta: dahsboardData.meta,
                  // dashboard: values,
                  message: '',
                  overwrite: true,
                  folderId: null
                })
                .then((response) => {
                  console.log(response, 'responseresponse');
                  resetForm();
                  toggle();
                  setModal(false);
                });
            }}
            onCancel={toggle}
          >
            {({ values: any }) => (
              <>
                <FormField name="title" type="text" label="Title" />
              </>
            )}
          </Form>
        </ModalBody>
      </Modal>
      
      </PrivateComponent>

    
    </>
  );
};

export default DashNav;
