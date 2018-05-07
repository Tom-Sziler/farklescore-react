import React from 'react';
import {connect} from 'react-redux';
import { Button, Form, Dropdown, List, Icon } from 'semantic-ui-react';


class StartScreen extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const options = [
      { key: 1, text: '5000', value: 5000 },
      { key: 2, text: '7500', value: 7500 },
      { key: 3, text: '10000', value: 10000 },
      { key: 4, text: '15000', value: 15000 }
    ];
    let playerList = [] //['Tom', 'Jeannette', 'Dad', 'Mom', 'Timnmy'];
    return (
      <div className="startContainer">
        <h1> Enter Player Names </h1>
        <div className="form-container">
          <Form>
            <Form.Field>
              <input placeholder='Enter Player Name' />
            </Form.Field>
            <Button type='submit'>Add Player</Button>
          </Form>
        </div>
        <div className="playerListContainer">
          <h2> Player List </h2>
          {playerList.length ? 
            <List celled>
              {playerList.map(player => {
                return (
                  <List.Item>
                    <List.Content className="individualPlayer">
                      <List.Header>{player}</List.Header>
                      <Icon className="icons" name="remove circle" />
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
            :
            <p> No players yet, add some now! </p>
          }
        </div>
        
        <Dropdown placeholder='How Many Points To Win?' fluid selection options={options} />
        <Button className="start" type='submit'>Start Game!</Button>
      </div>
    );
  }
}

const mapState = (state) => {
};

export default connect(mapState)(StartScreen);