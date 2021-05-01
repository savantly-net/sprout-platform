import { PanelProps } from '@savantly/sprout-api';
import { cleanup, render, waitForElement } from '@testing-library/react';
import moxios from 'moxios';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { sproutApiSvc } from '../../../core/services/sproutApiSvc';
import { WidgetPanelOptions } from './types';
import { WidgetPanel } from './WidgetPanel';

const mockHtmlResponse = {
  url: '/api/widget-data/111/222',
  payload: {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
      'widget-id': '111',
      'widget-name': 'hello-world',
      'widget-data-type': 'MARKUP'
    },
    responseText: `<h1>Hello World</h1>`
  }
};
const mockMarkupResponse = {
  url: '/api/widget-data/222/333',
  payload: {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
      'widget-id': '333',
      'widget-name': 'hello-world',
      'widget-data-type': 'MARKUP'
    },
    responseText: `# Hello World`
  }
};

const getMockWidgetPanelProps = (options: WidgetPanelOptions): PanelProps<WidgetPanelOptions> => {
  return {
    data: 123 as any,
    id: 1,
    onOptionsChange: (o) => {},
    options: options,
    renderCounter: 1,
    title: 'widget',
    transparent: false,
    height: 8,
    width: 12
  };
};

beforeAll(() => {
  moxios.install(sproutApiSvc);
});

afterAll(() => {
  moxios.uninstall(sproutApiSvc);
});

afterEach(() => {
  cleanup();
});

test('renders Markup WidgetData', async () => {
  // Match against a exact URL values
  moxios.stubRequest(mockHtmlResponse.url, mockHtmlResponse.payload);
  const component = render(
    <BrowserRouter>
      <WidgetPanel
        {...getMockWidgetPanelProps({
          dataSourceId: '111',
          dataId: '222'
        })}
      />
    </BrowserRouter>
  );
  await waitForElement(() => component.getByText('Hello World'));
  expect(component.container).toMatchSnapshot();
});

test('renders Markdown WidgetData', async () => {
  // Match against a exact URL values
  moxios.stubRequest(mockMarkupResponse.url, mockMarkupResponse.payload);

  const component = render(
    <BrowserRouter>
      <WidgetPanel
        {...getMockWidgetPanelProps({
          dataSourceId: '222',
          dataId: '333'
        })}
      />
    </BrowserRouter>
  );
  await waitForElement(() => component.getByText('# Hello World'));
  expect(component.container).toMatchSnapshot();
});
