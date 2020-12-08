import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Alert } from 'reactstrap';
import Page from '../../core/components/Page/Page';
import { getNavModel } from '../../core/selectors/navModel';
import { DashboardDTO, StoreState } from '../../types';
import { dashboardService } from '../dashboard/services/dashboardService';

const emptyDashboards: DashboardDTO[] = [];

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
                <ul>
                  {versionedList[k].map((d) => (
                    <li>
                      <NavLink to={`/d/${d.dashboard.uid}`}>{d.dashboard.title}</NavLink>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export const ManageDashboardsPage = () => {
  const navModel = useSelector((state: StoreState) => getNavModel(state.navIndex, 'manage-dashboards'));

  const [error, setError] = useState('');
  const [dashboards, setDashboards] = useState(emptyDashboards);
  const once = 'once';

  useMemo(() => {
    dashboardService
      .getDashboardsByFolderId(null)
      .then((response) => {
        setDashboards(response.data);
      })
      .catch((err) => {
        setError(err.detail || err.message || err.status);
      });
  }, [once]);

  return (
    <Page navModel={navModel}>
      <Page.Contents>
        <>
          {error && <Alert color="danger">{error}</Alert>}
          {dashboards && <DashboardList dashboards={dashboards} />}
        </>
      </Page.Contents>
    </Page>
  );
};
