const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    validate: {
      len: [20, 9999999]
    },
    allowNull: false
  },
  star: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = Review;
