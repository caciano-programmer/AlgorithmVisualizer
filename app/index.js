import React from 'react';
import ReactDom from 'react-dom';
import Home from './pages/home/home';
import Path from './pages/path/path';
import Graph from './pages/graph/graph';
import Sort from './pages/sort/sort';

const Components = () => (
  <div>
    <Home />
    <Path />
    <Graph />
    <Sort />
  </div>
);

ReactDom.render(<Components />, document.getElementById('root'));
