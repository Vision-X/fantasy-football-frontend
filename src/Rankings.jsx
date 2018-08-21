import React, { Component, Fragment } from 'react';
import ReactDataGrid from 'react-data-grid';
// import ReactDataGridPlugins from 'react-data-grid/addons';


class Rankings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    // this.fetchRankings();
  }

  fetchRankings = () => {
    let dataGetter = response => {
      this.setState({ data: response[0] }, function() {
        console.log("state", this.state.data);
        // let players = this.state.data[0];
        let rows = [];
        for (let i = 0; i < this.state.data.length; i++) {
          let player = this.state.data[i];
          rows.push({
            playerName: player.playerName,
            teamName: player.teamName,
            bye: player.bye,
            bestRank: player.bestRank,
            worstRank: player.worstRank,
            avgRank: player.avgRank,
            adp: player.adp
          })
      }
      this.setState({ rowz: rows })
    })
  }

    let url = 'https://fantasy-football-api.firebaseapp.com/rankings.json';
    return fetch(url)
           .then(response => response.json())
           .then(dataGetter)
           .catch(console.log("nopeeeee"))
  }

  rowGetter = (i) => {
    return this.state.rowz[i];
  }

  renderWhenFetched = () => {
    if (this.state.data && this.state.rowz) {
      const columns = [{
        name: 'Name',
        key: 'playerName'
      }, {
        name: 'Team',
        key: 'teamName'
      }, {
        name: 'Position',
        key: 'position'
      }, {
        name: 'Bye',
        key: 'bye'
      }, {
        name: 'Best Rank',
        key: 'bestRank'
      }, {
        name: 'Worst Rank',
        key: 'worstRank'
      }, {
        name: 'Avg Rank',
        key: 'avgRank'
      }, {
        name: 'ADP',
        key: 'adp'
      }];
      return (
        <section>
          <ReactDataGrid
            columns={columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rowz.length}
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
    this.fetchRankings();
    // this.createRows()
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
