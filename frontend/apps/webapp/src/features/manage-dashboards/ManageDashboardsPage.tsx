import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'reactstrap';
import Page from '../../core/components/Page/Page';
import { getNavModel } from '../../core/selectors/navModel';
import { DashboardDTO, StoreState } from '../../types';
import { dashboardService } from '../dashboard/services/dashboardService';

const emptyDashboards: DashboardDTO[] = [];

const DashboardList = ({ dashboards }: { dashboards: DashboardDTO[] }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {dashboards &&
          dashboards.map((d) => (
            <tr key={d.dashboard.id}>
              <td>{d.dashboard.title}</td>
              <td>{d.dashboard.id}</td>
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
