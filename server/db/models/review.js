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
  userName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  star: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = Review;
