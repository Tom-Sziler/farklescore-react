import React from 'react';
import {connect} from 'react-redux';
import { Button } from 'semantic-ui-react';
import { TurnButtons, ShowScore, ScoreBox } from '../components';
import { fetchAllPlayers, editPlayer } from '../store';


class ScoreButtons extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.loadPlayers();
  }


  render() {
    let buttons = [
      { name: 'One', value: 100 },
      { name: 'Five', value: 50 },
      { name: 'Three Ones', value: 300 },
      { name: 'Three Twos', value: 200 },
      { name: 'Three Threes', value: 300 },
      { name: 'Three Fours', value: 400 },
      { name: 'Three Fives', value: 500 },
      { name: 'Three Sixes', value: 600 },
      { name: 'Three Pairs', value: 1500 },
      { name: 'Four of a Kind', value: 1000 },
      { name: 'Five of a Kind', value: 2000 },
      { name: 'Six of a Kind', value: 3000 },
      { name: 'Two Triplets', value: 2500 },
      { name: 'Four and Two', value: 1500 },
      { name: '1-6 Straight', value: 1500 },
    ];

    // need Current player ID
    let currentPlayer = this.props.playerList.filter(player => player.isTurn === true)[0];
    // need value from pressed button
    // send the above two items to the editPlayer function to mod the DB


    // need to set "true" to a player as soon as we start the game
    // Gotta figure out how to advance the turn reliably 

    return currentPlayer ? (
      <div className="gameContainer">
        <div className="buttonContainer">
          <ScoreBox />
          {buttons.map(btn => {
            return (<Button basic className="pointButtons" key={ btn.name }
              onClick={ () => {
                let newCurrentRoll = btn.value += currentPlayer.currentRoll;
                return this.props.editScore(currentPlayer.id, newCurrentRoll);
              }
              }>{ btn.name }</Button>);
          })}
          <TurnButtons />
          <ShowScore />
        </div>
      </div>
    )
      :
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
    editScore(id, points) {
      let info = {currentRoll: points};
      dispatch(editPlayer(id, info));
    }
  };
};

export default connect(mapState, mapDispatch)(ScoreButtons);
