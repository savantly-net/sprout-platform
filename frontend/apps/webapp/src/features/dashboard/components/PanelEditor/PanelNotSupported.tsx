import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, VerticalGroup } from '@sprout-platform/ui';
// import { Button, VerticalGroup } from '@savantly/sprout-ui';
// import { Button } from '@chakra-ui/react';
import { Layout } from '@savantly/sprout-ui';
import { PanelEditorTabId } from './types';
import { getLocationSrv } from '@savantly/sprout-runtime';

export interface Props {
  message: string;
  dispatch?: Dispatch;
}

const updateLocation = getLocationSrv().update;

export const PanelNotSupported: FC<Props> = ({ message, dispatch: propsDispatch }) => {
  const dispatch = propsDispatch ? propsDispatch : useDispatch();
  const onBackToQueries = useCallback(() => {
    updateLocation({ query: { tab: PanelEditorTabId.Query }, partial: true })
  }, [dispatch]);

  return (
    <Layout justify="center" style={{ marginTop: '100px' }}>
      <VerticalGroup spacing="md">
        <h2>{message}</h2>
        <div>
          <Button size="md" variant="secondary" icon="arrow-left" onClick={onBackToQueries}>
            Go back to Queries
          </Button>
        </div>
      </VerticalGroup>
    </Layout>
  );
};
