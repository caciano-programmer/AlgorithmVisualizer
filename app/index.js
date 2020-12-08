import React from 'react';
import ReactDom from 'react-dom';
import Sort from './sort/sort';
import Header from './UI/header/header';
import Footer from './UI/footer/footer';

import 'normalize.css';
import './index.css';

const App = () => (
  <React.StrictMode>
    <Header />
    <Sort />
    <Footer />
  </React.StrictMode>
);

ReactDom.render(<App />, document.getElementById('root'));
