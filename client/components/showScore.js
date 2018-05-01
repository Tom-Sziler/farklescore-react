import React from 'react';
import { Button } from 'semantic-ui-react';


const ShowScore = () => {

  return (
    <Button basic color="blue" className="seeScores" onClick={() => console.log('[show scores modal]')}> Show Scores </Button>
  );
};


export default ShowScore;

