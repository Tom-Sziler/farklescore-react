import React from 'react';
import { Button } from 'semantic-ui-react';


const TurnButtons = () => {

  const rollAgain = () => console.log('Roll Again');
  const endTurn = () => console.log('End Turn');
  const farkle = () => console.log('Farkle!!');
  const clearRoll = () => console.log('Clear Roll');
  
  let buttons = [
    {name: 'Roll Again', action: () => rollAgain()},
    {name: 'Clear Roll', action: () => clearRoll()},
    {name: 'End Turn', action: () => endTurn()},
    {name: 'Farkle!', action: () => farkle()}
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
};


export default TurnButtons;
