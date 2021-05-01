import { getApiService } from '@savantly/sprout-runtime';
import { useMemo, useState } from 'react';
import { WidgetData } from '../types';

export const WidgetApi = {
  getWidgetData: (dataSourceId: string) => {
    return getApiService().get<WidgetData[]>(`/api/widget-data/${dataSourceId}`);
  },

  getWidgetDataById: (dataSourceId: string, dataId: string) => {
    return getApiService().get<any>(`/api/widget-data/${dataSourceId}/${dataId}`);
  }
};

export const useWidgetData = (dataSourceId?: string) => {
  const [state, setState] = useState([] as WidgetData[]);
  const [fetching, setFetching] = useState(false);

  useMemo(() => {
    if ((!state || state.length === 0) && !fetching && dataSourceId) {
      setFetching(true);
      WidgetApi.getWidgetData(dataSourceId)
        .then((data) => {
          setState(data.data);
        })
        .catch((err) => {
          console.error(`failed to get data for datasource ${dataSourceId}`, err);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [dataSourceId]);

  return state;
};

export const useWidgetDataById = (dataSourceId?: string, dataId?: string) => {
  const [state, setState] = useState(undefined as WidgetData | undefined);
  const [fetching, setFetching] = useState(false);

  useMemo(() => {
    if (!state && !fetching && dataSourceId && dataId) {
      setFetching(true);
      WidgetApi.getWidgetDataById(dataSourceId, dataId)
        .then((response) => {
          setState({
            id: response.headers['widget-id'],
            name: response.headers['widget-name'],
            dataType: response.headers['widget-data-type'],
            data: response.data
          });
        })
        .catch((err) => {
          console.error(`failed to get data for datasource: ${dataSourceId}, id: ${dataId}`, err);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [dataSourceId, dataId]);

  return state;
};
