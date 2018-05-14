import React from 'react';
import {connect} from 'react-redux';
import { Button, Form, Dropdown, List, Icon } from 'semantic-ui-react';
import { fetchAllPlayers, deletePlayer, newPlayer, editPlayer, createGame } from '../store';
import { Link } from 'react-router-dom';


class StartScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      formInput: '',
      pointsToWin: 0
    };
  }

  componentDidMount() {
    this.props.loadPlayers();
  }

  render() {
    const handleChange = (evt) => {
      this.setState({
        formInput: evt.target.value
      });
    };

    const formatName = (name) => {
      let newName = name.toLowerCase().split('');
      newName[0] = newName[0].toUpperCase();
      return newName.join('');
    };

    const handleSubmit = (evt) => {
      evt.preventDefault();
      this.props.addPlayer(formatName(this.state.formInput));
      this.setState({
        formInput: ''
      });
    };

    const selectPoints = (value) => {
      this.setState({
        pointsToWin: value
      });
    };

    const options = [
      { key: 1, text: '5000', value: 5000 },
      { key: 2, text: '7500', value: 7500 },
      { key: 3, text: '10000', value: 10000 },
      { key: 4, text: '15000', value: 15000 }
    ];

    let playerList = this.props.playerList;

    return (
      this.props.playerList ?
        <div className="startContainer">
          <h1> Enter Player Names </h1>
          <div className="form-container">
            <Form onSubmit={(evt) => handleSubmit(evt)}>
              <Form.Field>
                <input name="nameField" value={this.state.formInput} onChange={(evt) => handleChange(evt)} placeholder="Enter Player Name" />
              </Form.Field>
              <Button type="submit">Add Player</Button>
            </Form>
          </div>
          <div className="playerListContainer">
            <h2> Player List </h2>
            {playerList.length ?
              <List celled>
                {playerList.map(player => {
                  return (
                    <List.Item key={player.id}>
                      <List.Content className="individualPlayer">
                        <List.Header >{player.name}</List.Header>
                        <Icon className="icons" name="remove circle" onClick={() => this.props.removePlayer(player.id)} />
                      </List.Content>
                    </List.Item>
                  );
                })}
              </List>
              :
              <p> No players yet, add some now! </p>
            }
          </div>
        
          <Dropdown placeholder="How Many Points To Win?" fluid selection options={options} onChange={(evt, value) => selectPoints(value.value)} />
          <Link to="/game" ><Button className="start" type="submit" onClick={() => {
            this.props.setFirstPlayer(this.props.playerList[0]);
            this.props.newGame(this.state.pointsToWin); 
          }}>Start Game!</Button></Link>
        </div>
        :
        null
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
    },
    removePlayer(id) {
      dispatch(deletePlayer(id));
    },
    addPlayer(name) {
      dispatch(newPlayer(name));
    },
    newGame(points) {
      dispatch(createGame(points));
    },
    setFirstPlayer(player) {
      dispatch(editPlayer(player.id, {isTurn: true}));
    }
  };
};

export default connect(mapState, mapDispatch)(StartScreen);
