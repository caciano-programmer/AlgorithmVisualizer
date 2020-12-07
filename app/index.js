import React from 'react';
import ReactDom from 'react-dom';
import Sort from './sort/sort';

import 'normalize.css';

// TODO Make sure you can exit out of current animations on button press
// TODO Make sure to implement as PWA for offline use
const App = () => (
  <React.StrictMode>
    <Sort />
  </React.StrictMode>
);

ReactDom.render(<App />, document.getElementById('root'));
