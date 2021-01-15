import { css } from 'emotion';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Alert, Button } from 'reactstrap';
import Page from '../../core/components/Page/Page';
import { getNavModel } from '../../core/selectors/navModel';
import { DashboardDTO, StoreState } from '../../types';
import { dashboardService } from '../dashboard/services/dashboardService';

const DashboardList = ({ dashboards }: { dashboards: DashboardDTO[] }) => {
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
                {versionedList[k].map((d) => (
                  <div key={d.dashboard.uid}>
                    <NavLink to={`/d/${d.dashboard.uid}`}>
                      version {d.dashboard.version} ({d.dashboard.title})
                    </NavLink>
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

  useMemo(() => {
    if (!fetching && !dashboards) {
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
  }, [fetching, dashboards]);

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
          {dashboards && <DashboardList dashboards={dashboards} />}
        </>
      </Page.Contents>
    </Page>
  );
};
