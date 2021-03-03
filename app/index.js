import React from 'react';
import ReactDom from 'react-dom';
import { Sort } from './sort/sort';
import { ErrorBoundary } from './error/error';

import 'normalize.css';
import './index.css';

ReactDom.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Sort />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
