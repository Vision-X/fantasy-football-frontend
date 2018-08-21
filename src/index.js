import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Rankings from './Rankings';
import DfsPortal from './DfsPortal';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Fragment>
      <Route exact path="/" component={ App } />
      <Route path="/rankings" component={ Rankings } />
      <Route path="/dfsportal" component={ DfsPortal } />
    </Fragment>
  </Router>,
document.getElementById('root'));
registerServiceWorker();
