import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Rankings from './Rankings';
import Rankings_Half_PPR from './Rankings_Half_PPR';
import DynastyRankings from './DynastyRankings';
import DfsPortal from './DfsPortal';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Fragment>
      <Route exact path="/" component={ App } />
      <Route path="/rankings" component={ Rankings } />
      <Route path="/rankings-half-ppr" component={ Rankings_Half_PPR } />
      <Route path="/dynastyrankings" component={ DynastyRankings } />
      <Route path="/dfsportal" component={ DfsPortal } />
    </Fragment>
  </Router>,
document.getElementById('root'));
registerServiceWorker();
