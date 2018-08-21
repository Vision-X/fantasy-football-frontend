import React, { Component, Fragment } from 'react';
import ReactDataGrid from 'react-data-grid';
// import ReactDataGridPlugins from 'react-data-grid/addons';


class Rankings extends Component {
  constructor() {
    super();
    this._columns = [{
      name: 'Name',
      key: 'playerName',
      width: 250
    }, {
      name: 'Position',
      key: 'position'
    }, {
      name: 'Team',
      key: 'teamName'
    }, {
      name: 'Bye',
      key: 'bye',
      sortable: true
    }, {
      name: 'Best Rank',
      key: 'bestRank',
      sortable: true
    }, {
      name: 'Worst Rank',
      key: 'worstRank',
      sortable: true
    }, {
      name: 'Avg Rank',
      key: 'avgRank',
      sortable: true
    }, {
      name: 'ADP',
      key: 'adp',
      sortable: true
    }];
    this.fetchRankings();
    let originalRows;
    let rows;
    this.state = { originalRows, rows };
  }

  ogRows = () => {
    this.setState({ rows: this.state.originalRows.slice(0) });
  }

  makeRows = () => {
    this.setState({ originalRows: this.createRows(200) }, this.ogRows);
  }

  fetchRankings = () => {
    let dataGetter = response => {
      this.setState({ data: response[0] }, this.makeRows)
  }
    let url = 'https://fantasy-football-api.firebaseapp.com/rankings.json';
    return fetch(url)
           .then(response => response.json())
           .then(dataGetter)
           .catch(console.log("nopeeeee"))
  }

  createRows = () => {
    let rows = [];
    for (let i = 0; i < this.state.data.length; i++) {
      let player = this.state.data[i];
      rows.push({
        playerName: player.playerName,
        teamName: player.teamName,
        position: player.position,
        bye: player.bye,
        bestRank: player.bestRank,
        worstRank: player.worstRank,
        avgRank: player.avgRank,
        adp: player.adp
      })
  }
  return rows;
}

  rowGetter = (i) => {
    return this.state.rows[i];
  }

  handleGridSort = (sortColumn, sortDirection) => {
  const comparer = (a, b) => {
    let intA = Number(a[sortColumn]);
    let intB = Number(b[sortColumn]);
    if (sortDirection === 'ASC') {
      return (intA > intB) ? 1
                          : (intA < intB)
                          ? -1 : 0
    } else if (sortDirection === 'DESC') {
      return (intA < intB) ? 1
                           : (intA > intB)
                           ? -1 : 0
      }
    }
    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0)
                                          : this.state.rows.sort(comparer)
    this.setState({ rows })
  }

  renderWhenFetched = () => {
    if (this.state.data && this.state.rows) {
      return (
        <section>
          <ReactDataGrid
            onGridSort={this.handleGridSort}
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
            minHeight={600}
          />
        </section>
      )
    } else {
      return (
        <Fragment>
          <section>
            <h2>waiting for the data... please hold</h2>
          </section>
        </Fragment>
      )
    }
  }

  componentDidMount() {

  }

  render() {

    return (
      <Fragment>
        <h2>Player Rankings</h2>
        {this.renderWhenFetched()}
      </Fragment>
    )
  }
}

export default Rankings;
