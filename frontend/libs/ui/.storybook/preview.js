import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'react-mde/lib/styles/css/react-mde-all.css';
import 'react-datetime/css/react-datetime.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    </BrowserRouter>
  )
];
