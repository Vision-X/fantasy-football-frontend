import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <div className="bobby"></div>
          <h1>Fantasy Football Tools</h1>
          <nav>
            <ul>
              <li>Home</li>
              <li><Link to='/Rankings'>PPR Rankings</Link></li>
              <li><Link to='/rankings-half-ppr'>Half-PPR Rankings</Link></li>
              <li><Link to='/dynastyrankings'>Dynasty Rankings</Link></li>
              <li><Link to='/DfsPortal'>DFS Portal</Link></li>
            </ul>
          </nav>
        </header>
        <section className="app-section">
          <h2>We did it!</h2>
          <br />
          <h2>...We're doing it again</h2>
        </section>
      </Fragment>
    );
  }
}

export default App;
