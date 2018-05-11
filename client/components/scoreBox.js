import React from 'react';
import {connect} from 'react-redux';
import { Table } from 'semantic-ui-react';
import { fetchAllPlayers } from '../store';


class ScoreBox extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount () {
    this.props.loadPlayers();
  }

  render() {
    let currentPlayer = this.props.playerList.filter(player => player.isTurn === true)[0];


    return currentPlayer ? (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="center" ><h1>{ `${currentPlayer.name}'s Turn` }</h1></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell className="center" >TOTAL FARKLES: { currentPlayer.farkles }</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="center" >TOTAL POINTS: { currentPlayer.points }</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="center" >CURRENT TURN: { currentPlayer.currentTurn }</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="center" >CURRENT ROLL: { currentPlayer.currentRoll }</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
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
    }
  };
};

export default connect(mapState, mapDispatch)(ScoreBox);
