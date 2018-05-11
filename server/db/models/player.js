const Sequelize = require('sequelize');
const db = require('../db');


const Player = db.define('player', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isTurn: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  farkles: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  currentTurn: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  currentRoll: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = Player;
