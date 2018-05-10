import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const END_GAME = 'END_GAME';
const NEW_GAME = 'NEW_GAME';


/**
 * INITIAL STATE
 */
const game = [];

/**
 * ACTION CREATORS
 */

const endGame = gameGame => ({type: END_GAME, gameGame });
const newGame = gameGame => ({type: NEW_GAME, gameGame });


/**
 * THUNK CREATORS
 */


export const endCurrentGame = (gameId) => dispatch => {
  axios.delete(`/api/game/${gameId}`)
    .then(res => dispatch(endGame(gameId)));
};

export const createGame = (pointsToWin) => dispatch => {
  axios.post('/api/game/', {pointsToWin})
    .then(res => dispatch(newGame(res.data)));
};


/**
 * REDUCER
 */
export default function (currentGame = game, action) {
  switch (action.type) {
  case END_GAME:
    return currentGame.filter(thisGame => thisGame.id !== action.game);
  case NEW_GAME:
    return [...currentGame, action.game];
  default:
    return currentGame;
  }
}
