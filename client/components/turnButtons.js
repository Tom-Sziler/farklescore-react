import React from 'react';
import {connect} from 'react-redux';
import { Button } from 'semantic-ui-react';
import { fetchAllPlayers, editPlayer, fetchGame } from '../store';
import history from '../history';


class TurnButtons extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.loadPlayers();
    this.props.loadGame();
  }


  render(){
    let points = null;
    if (this.props.game[0]){
      points = this.props.game[0].pointsToWin;
    }
    const playerList = this.props.playerList.sort((a, b) => a.id - b.id);
    const currentPlayer = playerList.filter(player => player.isTurn === true)[0];
   
    let nextPlayer = playerList.map((player, index) => {
      let next;
      if (player.isTurn === true){
        next = playerList[index + 1] || playerList[0];
      }
      return next;
    }).filter(player => player)[0];

    let buttons = [
      {name: 'Roll Again', action: () => this.props.rollAgain(currentPlayer)},
      {name: 'Clear Roll', action: () => this.props.clearCurrentRoll(currentPlayer)},
      {name: 'End Turn', action: () => {
        this.props.endRoll(currentPlayer, points);
        this.props.advanceTurn(currentPlayer, nextPlayer);
      }},
      {name: 'Farkle!', action: () => {
        this.props.farkle(currentPlayer);
        this.props.advanceTurn(currentPlayer, nextPlayer);
      }}
    ];

    return (
      <div className="gameContainer">
        <div className="buttonContainer">
          {buttons.map(btn => {
            return <Button basic className="pointButtons" key={ btn.name } onClick={ btn.action }>{ btn.name }</Button>;
          })}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    game: state.game,
    playerList: state.player,
    currentPlayer: state.player.filter(player => player.isTurn === true)
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadPlayers() {
      dispatch(fetchAllPlayers());
    },
    loadGame() {
      dispatch(fetchGame());
    },
    advanceTurn(player, nextPlayer) {
      dispatch(editPlayer(player.id, {isTurn: false}));
      dispatch(editPlayer(nextPlayer.id, {isTurn: true}));
    },
    endRoll(player, winPoints) {
      let thisTurn = player.currentRoll += player.currentTurn;
      let newTotal = thisTurn += player.points;
      if (newTotal >= winPoints){
        history.push('/win');
      }
      dispatch(editPlayer(player.id, {currentRoll: 0, currentTurn: 0, points: newTotal}));
    },
    farkle(player) {
      let newFarkles = player.farkles += 1;
      dispatch(editPlayer(player.id, {currentRoll: 0, currentTurn: 0, farkles: newFarkles}));
    },
    clearCurrentRoll(player) {
      dispatch(editPlayer(player.id, {currentRoll: 0}));
    },
    rollAgain(player) {
      let thisTurn = player.currentRoll += player.currentTurn;
      dispatch(editPlayer(player.id, {currentRoll: 0, currentTurn: thisTurn}));
    }
  };
};

export default connect(mapState, mapDispatch)(TurnButtons);
