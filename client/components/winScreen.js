import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { fetchAllPlayers, editPlayer } from '../store';
import history from '../history';


class WinScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadPlayers();
  }

  render() {
    const players = this.props.playerList.sort((a,b) => b.points - a.points);
    console.log('here are your players', players);

    return players[0] ? (
      <div>
        <h1 className="center"> {players[0].name} Wins with {players[0].points} points!!</h1>
        <Table singleLine>
          <Table.Body>
            {players.map(player => {
              return (
                <Table.Row key={player.id}>
                  <Table.Cell className="center" >{player.name}: <span>{player.points} points...</span> <span>Farkles: {player.farkles}</span></Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <Button onClick={ () => {
          players.forEach((player) => {
            this.props.clearPlayerData(player);
          });
          this.props.history.push('/');
        }}> Start New Game </Button>
      </div>
    ) :
      null;
  }
}

const mapState = (state) => {
  return {
    playerList: state.player
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadPlayers() {
      dispatch(fetchAllPlayers());
    },
    clearPlayerData(player) {
      const info = { isTurn: false, points: 0, farkles: 0, thisTurn: 0, thisRoll: 0, gameId: null};
      dispatch(editPlayer(player.id, info));
    }
  };
};


export default connect(mapState, mapDispatch)(WinScreen);

