import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <>
    <h1>Home</h1>
    <div>
      <Link to="/graph">Graph</Link>
    </div>
    <div>
      <Link to="/sort">Sort</Link>
    </div>
    <div>
      <Link to="/path">Path</Link>
    </div>
  </>
);
