import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactDataGrid from 'react-data-grid';

class Rankings extends Component {
  constructor() {
    super();
    this._columns = [{
      name: 'Name',
      key: 'playerName',
      width: 250,
      sortable: true
    }, {
      name: 'Position',
      key: 'position',
      sortable: true
    }, {
      name: 'Team',
      key: 'teamName',
      sortable: true
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
    this._headers = {
        name: "Name",
        team: "Team",
        position: "Position",
        bye: "Bye",
        bestRank: "Best Rank",
        worstRank: "Worst Rank",
        avgRank: "Avg Rank",
        adp: "ADP"
    };
    this.fetchRankings();
    let originalRows;
    let rows;
    this.state = { originalRows, rows };
    this._onClick = this._onClick.bind(this);
  }

  fetchRankings = () => {
    let dataGetter = response => {
      this.setState({ data: response[0] }, this.makeRows)
    }
    let url = 'https://fantasy-football-api.firebaseapp.com/rankings.json';
    return fetch(url)
    .then(response => response.json())
    .then(dataGetter)
    .catch(console.log("no errors"))
  }

  ogRows = () => {
    this.setState({ rows: this.state.originalRows.slice(0) });
  }

  makeRows = () => {
    this.setState({ originalRows: this.createRows(200) }, this.ogRows);
  }


  createRows = () => {
    let rows = [];
    for (let i = 0; i < this.state.data.length; i++) {
      let player = this.state.data[i];
      rows.push({
        playerName: player.playerName,
        teamName: player.teamName,
        // alternate team name for Defenses, test first
        // || player.playerName.slice(player.playerName.length -4,
        //player.playerName.length -2),
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
    if (a[sortColumn] == Number(a[sortColumn])) {
      let intA = Number(a[sortColumn]) || 1000;
      let intB = Number(b[sortColumn]) || 1000;
      if (sortDirection === 'ASC') {
        return (intA > intB) ? 1
                             : (intA < intB)
                             ? -1
                             : 0
      } else if (sortDirection === 'DESC') {
        return (intA < intB) ? 1
                             : (intA > intB)
                             ? -1
                             : 0
      }
    } else {
      let wordA = a[sortColumn];
      let wordB = b[sortColumn];
      if (sortDirection === 'ASC') {
        return (wordA > wordB) ? 1
                               : (wordA < wordB)
                               ? -1
                               : 0
      } else if (sortDirection === 'DESC') {
        return (wordA < wordB) ? 1
                               : (wordA > wordB)
                               ? -1
                               : 0
      }
      }
    }
    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0)
                                          : this.state.rows.sort(comparer)
    this.setState({ rows })
  }


  convertToCSV = (objArray) => {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';
      for (var i = 0; i < array.length; i++) {
          var line = '';
          for (var index in array[i]) {
              if (line != '') line += ','
              line += array[i][index];
          }
          str += line + '\r\n';
      }
      return str;
  }

  exportCSVFile = (headers, items, fileTitle) => {
      if (headers) {
          items.unshift(headers);
      }
      var jsonObject = JSON.stringify(items);
      var csv = this.convertToCSV(jsonObject);
      var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, exportedFilenmae);
      } else {
          var link = document.createElement("a");
          if (link.download !== undefined) { // feature detection
              // Browsers that support HTML5 download attribute
              var url = URL.createObjectURL(blob);
              link.setAttribute("href", url);
              link.setAttribute("download", exportedFilenmae);
              link.style.visibility = 'hidden';
              document.querySelector('#root').appendChild(link);
              link.click();
              document.querySelector('#root').removeChild(link);
          }
      }
  }

  download = () => {
    var playersNotFormatted = Array.from(this.state.data);
    var playersFormatted = [];
    playersNotFormatted.forEach((player) => {
        playersFormatted.push({
            name: player.playerName,
            team: player.teamName || player.playerName.replace(/()/g, '').split(0,2),
            position: player.position,
            bye: player.bye,
            bestRank: player.bestRank,
            worstRank: player.worstRank,
            avgRank: player.avgRank,
            adp: player.adp
        });
    });
    var fileTitle = 'PPR-Rankings-and-ADP';
    this.exportCSVFile(this._headers , playersFormatted, fileTitle);
  }

  _onClick = () => {
    this.download();
  }

  renderWhenFetched = () => {
    if (this.state.data && this.state.rows) {
      return (
        <section className="rankings-section">
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

  render() {
    return (
      <Fragment>
        <header>
          <div className="bobby"></div>
          <div>
            <h2>Player Rankings</h2>
            <p>Full PPR</p>
          </div>
          <button type="button" onClick={this._onClick}>Download CSV</button>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li>PPR Rankings</li>
              <li><Link to='/rankings-half-ppr'>Half-PPR Rankings</Link></li>
              <li><Link to='/dynastyrankings'>Dynasty Rankings</Link></li>
              <li><Link to='/DfsPortal'>DFS Portal</Link></li>
            </ul>
          </nav>
        </header>
        {this.renderWhenFetched()}
      </Fragment>
    )
  }
}

export default Rankings;
