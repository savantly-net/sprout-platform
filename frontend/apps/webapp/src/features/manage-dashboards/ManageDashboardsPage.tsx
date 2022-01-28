import { css } from 'emotion';
/* eslint-disable */
import React, { useMemo, useState } from 'react';
/* eslint-enable */
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import Page from '../../core/components/Page/Page';
import { getNavModel } from '../../core/selectors/navModel';
import { DashboardDTO, StoreState } from '../../types';
import { dashboardService } from '../dashboard/services/dashboardService';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

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
    <Table>
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Versions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {versionedList &&
          Object.keys(versionedList).map((k) => (
            <Tr key={k}>
              <Td>{versionedList[k][0].dashboard.title}</Td>
              <Td>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Td>Version</Td>
                      <Td>Message</Td>
                      <Td>Actions</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {versionedList[k]
                      .sort(
                        ({ dashboard: { version: versionA } }, { dashboard: { version: versionB } }) =>
                          versionA - versionB
                      )
                      .map((d) => (
                        <Tr
                          className={cx('DashboardList__versionLine', {
                            DashboardList__activeVersion: d.dashboard.currentVersion
                          })}
                        >
                          <Td><Link to={'/d/'+d.dashboard.uid}>{d.dashboard.version}</Link></Td>
                          <Td>{d.dashboard.message || 'NA'}</Td>
                          <Td>
                            {d.dashboard.currentVersion ? (
                              <Button disabled size="xs">
                                Active Version
                              </Button>
                            ) : (
                              <Button
                                size="xs"
                                onClick={() => onSetCurrentVersion(d.dashboard.id, d.dashboard.version)}
                              >
                                Use this version
                              </Button>
                            )}
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
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