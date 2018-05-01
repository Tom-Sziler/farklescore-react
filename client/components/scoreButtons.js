import React from 'react';
import { Button } from 'semantic-ui-react';
import { TurnButtons, ShowScore, ScoreBox } from '../components';


const ScoreButtons = () => {


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

  return (
    <div className="gameContainer">
      <div className="buttonContainer">
        <ScoreBox />
        {buttons.map(btn => {
          return <Button basic className="pointButtons" key={ btn.name } onClick={ () => addValue(btn.name, btn.value) }>{ btn.name }</Button>;
        })}
        <TurnButtons />
        <ShowScore />
      </div>
    </div>
  );
};

const addValue = (name, val) => {
  // take current value += this new val;
  console.log('YOU PRESSED', name, 'worth', val);
};

export default ScoreButtons;
