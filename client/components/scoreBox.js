import React from 'react';
import {connect} from 'react-redux';
import { Table } from 'semantic-ui-react';


class ScoreBox extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="center" >PLAYER X's TURN</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell className="center" >TOTAL POINTS: XXX</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="center" >CURRENT TURN: XXX</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="center" >CURRENT ROLL: XXX</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

const mapState = (state) => {
  return {
    machines: state.machine
  };
};

export default connect(mapState)(ScoreBox);
