const Sequelize = require('sequelize');
const db = require('../db');


const Game = db.define('game', {
  pointsToWin: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports = Game;
