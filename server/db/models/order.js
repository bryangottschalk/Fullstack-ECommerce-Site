const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  total: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM(
      'Cart',
      'Created',
      'Processing',
      'Cancelled',
      'Completed'
    ),
    allowNull: false
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Order;
