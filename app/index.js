import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import Home from './pages/home/home';
import Path from './pages/path/path';
import Graph from './pages/graph/graph';
import Sort from './pages/sort/sort';

import 'normalize.css';

const App = () => (
  <React.StrictMode>
    <Router>
      <header>
        <Link to="/">Home</Link>
      </header>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/path" exact>
          <Path />
        </Route>
        <Route path="/graph" exact>
          <Graph />
        </Route>
        <Route path="/sort" exact>
          <Sort />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>
);

ReactDom.render(<App />, document.getElementById('root'));
