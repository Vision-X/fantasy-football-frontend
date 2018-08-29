import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <h1>Fantasy Football Tools</h1>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/Rankings'>Rankings</Link></li>
              <li><Link to='/Rankings-half-ppr'/></li>
              <li><Link to='/DfsPortal'>DFS Portal</Link></li>
            </ul>
          </nav>
        </header>
        <section>
          <h2>We did it!</h2>
        </section>
      </Fragment>
    );
  }
}

export default App;
