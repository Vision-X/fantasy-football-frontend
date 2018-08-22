import React, { Component, Fragment } from 'react';
import ReactDataGrid, { utils } from 'react-data-grid';
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');
// import { Toolbar, Data: { Selectors } } from 'react-data-grid/addons';
const { getMixedTypeValueRetriever , isImmutableCollection } = utils;


class Rankings extends Component {
  constructor() {
    super();
    this._columns = [{
      name: 'Name',
      key: 'playerName',
      width: 250,
      filterable: true
    }, {
      name: 'Position',
      key: 'position',
      filterable: true
    }, {
      name: 'Team',
      key: 'teamName',
      filterable: true
    }, {
      name: 'Bye',
      key: 'bye',
      sortable: true,
      filterable: true
    }, {
      name: 'Best Rank',
      key: 'bestRank',
      sortable: true,
      filterable: true
    }, {
      name: 'Worst Rank',
      key: 'worstRank',
      sortable: true,
      filterable: true
    }, {
      name: 'Avg Rank',
      key: 'avgRank',
      sortable: true,
      filterable: true
    }, {
      name: 'ADP',
      key: 'adp',
      sortable: true,
      filterable: true
    }];
    this.fetchRankings();
    // let originalRows;
    // let rows;
    this.state = {
                   filters: {},
                   sortColumn: null,
                   sortDirection: null
                 };
  }

  // ogRows = () => {
  //   this.setState({ rows: this.state.originalRows.slice(0) });
  // }

  // makeRows = () => {
  //   this.setState({ rows: this.createRows(200) });
  // }

  fetchRankings = () => {
    let dataGetter = response => {
      this.setState({ data: response[0] }, this.rowsOnLoad)
  }
    let url = 'https://fantasy-football-api.firebaseapp.com/rankings.json';
    return fetch(url)
           .then(response => response.json())
           .then(dataGetter)
           .catch(console.log("nopeeeee"))
  }

  rowsOnLoad = () => {
    this.setState({ rows: this.createRows(350) });
  }

  createRows = () => {
    let rows = [];
    for (let i = 0; i < this.state.data.length; i++) {
      let player = this.state.data[i];
      console.log("playerdata ", player);
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

  getRows = () => {
    return Selectors.getRows(this.state);
  }

  getSize = () => {
    return this.getRows().length;
  }

  rowGetter = (rowIdx) => {
    // return this.state.rows[i];
    const rows = this.getRows();
    return rows[rowIdx];

  }

  // filterRows = (filters, rows = []) => {
  //   return rows.filter(r => {
  //     const retriever = getMixeTypeValueRetriever(isImmutableCollection(r));
  //     let include = true;
  //     for (let columnKey in filters) {
  //       if (filters.hasOwnProperty(columnKey)) {
  //         let colFilter = filters[columnKey];
  //
  //         if (colFilter.filterValues && typeof colFilter.filterValues === 'function') {
  //           include = include & colFilter.filterValues(r, colFilter, columnKey);
  //         } else if (typeof colFilter.filterTerm === 'string') {
  //           let rowValue = retriever.getValue(r, columnKey);
  //           if (rowValue) {
  //             if (rowValue.toString().toLowerCase().indexOf(colFilter.filterTerm.toLowerCase()) === -1) {
  //               include = include & false;
  //             }
  //           } else {
  //             include = include & false;
  //           }
  //         }
  //       }
  //     }
  //     return Boolean(include);
  //   })
  // }

  handleGridSort = (sortColumn, sortDirection) => {
  // const comparer = (a, b) => {
  //   let intA = Number(a[sortColumn]) || 1000;
  //   let intB = Number(b[sortColumn]) || 1000;
  //   if (sortDirection === 'ASC') {
  //     return (intA > intB) ? 1
  //                          : (intA < intB)
  //                          ? -1 : 0
  //   } else if (sortDirection === 'DESC') {
  //     return (intA < intB) ? 1
  //                          : (intA > intB)
  //                          ? -1 : 0
  //     }
  //   }
    // const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0)
    //                                       : this.state.rows.sort(comparer)

    this.setState({ sortColumn: sortColumn,
                    sortDirection: sortDirection });
  }

  handleFilterChange = (filter) => {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters }, function() {
                      console.log(this.state.filters);
                  });
  }

  onClearFilters = () => {
    this.setState({ filters: {} });
  }

  renderWhenFetched = () => {
    if (this.state.data && this.state.rows) {
      return (
        <section>
          <ReactDataGrid
            onGridSort={this.handleGridSort}
            enableCellSelect={true}
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
            minHeight={600}
            toolbar={<Toolbar enableFilter={true} />}
            onAddFilter={this.handleFilterChange}
            onClearFilters={this.onClearFilters}
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
