import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Table } from 'semantic-ui-react';
import { fetchAllPlayers } from '../store';


class ShowScore extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadPlayers();
  }

  render() {
    const players = this.props.playerList;

    return (
      <Modal trigger={<Button basic color="blue" className="seeScores" onClick={() => console.log('[show scores modal]')}> Show Scores </Button>}>
        <Modal.Header>SCORES</Modal.Header>
        <Modal.Content>
          <Table singleLine>
            <Table.Body>
              {players.sort((a, b) => b.points - a.points).map(player => {
                return (
                  <Table.Row key={player.id}>
                    <Table.Cell className="center" >{player.name}: <span>{player.points} points...</span> <span>Farkles: {player.farkles}</span></Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Modal.Content>
      </Modal>
    );
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


export default connect(mapState, mapDispatch)(ShowScore);

