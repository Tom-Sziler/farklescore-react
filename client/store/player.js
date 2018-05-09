import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALL_PLAYERS = 'GET_ALL_PLAYERS';
const REMOVE_PLAYER = 'REMOVE_PLAYER';
const ADD_PLAYER = 'ADD_PLAYER';
const CHANGE_INFO = 'CHANGE_INFO';

/**
 * INITIAL STATE
 */
const defaultPlayer = [];

/**
 * ACTION CREATORS
 */
const getPlayers = players => ({ type: GET_ALL_PLAYERS, players });
const removePlayer = player => ({type: REMOVE_PLAYER, player });
const addPlayer = player => ({type: ADD_PLAYER, player });
const changeInfo = player => ({type: CHANGE_INFO, player });

/**
 * THUNK CREATORS
 */
export const fetchAllPlayers = () => dispatch => {
  axios.get('/api/players/')
    .then(res => dispatch(getPlayers(res.data)));
};

export const deletePlayer = (playerId) => dispatch => {
  axios.delete(`/api/players/${playerId}`)
    .then(res => dispatch(removePlayer(playerId)));
};

export const newPlayer = () => dispatch => {
  axios.post('/api/players/')
    .then(res => dispatch(addPlayer(res.data)));
};

export const editPlayer = (playerId) => dispatch => {
  axios.put(`/api/players/${playerId}`)
    .then(res => dispatch(changeInfo(res.data)));
};

/**
 * REDUCER
 */
export default function (playerList = defaultPlayer, action) {
  switch (action.type) {
  case GET_ALL_PLAYERS:
    return action.players;
  case REMOVE_PLAYER:
    return playerList.filter(player => player.id !== action.player);
  case ADD_PLAYER:
    return [...playerList, action.player];
  case CHANGE_INFO:
    return playerList.map(player => (action.player.id === player.id ? action.player : player));
  default:
    return playerList;
  }
}
