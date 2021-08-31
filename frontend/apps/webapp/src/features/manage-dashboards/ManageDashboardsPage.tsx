import { css } from 'emotion';
import React, { useMemo, useState } from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Alert, Button } from 'reactstrap';
import Page from '../../core/components/Page/Page';
import { getNavModel } from '../../core/selectors/navModel';
import { DashboardDTO, StoreState } from '../../types';
import { dashboardService } from '../dashboard/services/dashboardService';

import './styles.scss';
import { setCurrentVersion } from './state/actions';

type SetCurrentVersionHandler = (id: string, version: number) => void;

const DashboardList = ({
  dashboards,
  onSetCurrentVersion
}: {
  dashboards: DashboardDTO[];
  onSetCurrentVersion: SetCurrentVersionHandler;
}) => {
  const versionedList: { [id: string]: DashboardDTO[] } = {};

  // add keys
  dashboards.forEach((d) => {
    versionedList[d.dashboard.id] = [];
  });

  // add data
  dashboards.forEach((d) => {
    versionedList[d.dashboard.id].push(d);
  });

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {versionedList &&
          Object.keys(versionedList).map((k) => (
            <tr key={k}>
              <td>{versionedList[k][0].dashboard.title}</td>
              <td>
                {versionedList[k]
                  .sort(
                    ({ dashboard: { version: versionA } }, { dashboard: { version: versionB } }) => versionA - versionB
                  )
                  .map((d) => (
                    <div
                      key={d.dashboard.uid}
                      className={cx('DashboardList__versionLine', {
                        DashboardList__activeVersion: d.dashboard.currentVersion
                      })}
                    >
                      <NavLink to={`/d/${d.dashboard.uid}`}>
                        version {d.dashboard.version} - {d.dashboard.message}
                      </NavLink>
                      &nbsp;
                      {d.dashboard.currentVersion ? (
                        <p>(Current)</p>
                      ) : (
                        <p>
                          (
                          <span
                            className="DashboardList__versionLine__useVersion"
                            onClick={() => onSetCurrentVersion(d.dashboard.id, d.dashboard.version)}
                          >
                            Use this version
                          </span>
                          )
                        </p>
                      )}
                    </div>
                  ))}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export const ManageDashboardsPage = () => {
  const navModel = useSelector((state: StoreState) => getNavModel(state.navIndex, 'manage-dashboards'));
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [fetching, isFetching] = useState(false);
  const [dashboards, setDashboards] = useState(undefined as DashboardDTO[] | undefined);

  const fetchDashboards = async (force = false) => {
    if (!fetching && (force || !dashboards)) {
      isFetching(true);
      dashboardService
        .getDashboardsByFolderId(null)
        .then((response) => {
          setDashboards(response.data);
        })
        .catch((err) => {
          setError(err.detail || err.message || err.status);
        })
        .finally(() => isFetching(false));
    }
  };

  useMemo(() => {
    fetchDashboards();
  }, [fetching, dashboards]);

  const onSetCurrentVersion: SetCurrentVersionHandler = async (id, version) => {
    await setCurrentVersion(id, version);
    await fetchDashboards(true);
  };

  return (
    <Page navModel={navModel}>
      <Page.Contents>
        <>
          {error && <Alert color="danger">{error}</Alert>}
          <div
            className={css`
              display: flex;
            `}
          >
            <Button
              className={css`
                margin-left: auto;
              `}
              onClick={() => {
                navigate('./new');
              }}
            >
              Create Dashboard
            </Button>
          </div>
          {dashboards && <DashboardList dashboards={dashboards} onSetCurrentVersion={onSetCurrentVersion} />}
        </>
      </Page.Contents>
    </Page>
  );
};
