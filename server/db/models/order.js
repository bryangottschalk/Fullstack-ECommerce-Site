const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  total: {
    type: Sequelize.FLOAT
  },
  status: {
    type: Sequelize.ENUM(
      'Cart',
      'Created',
      'Processing',
      'Cancelled',
      'Completed'
    ),
    allowNull: true
  },
  shippingAddress: {
    type: Sequelize.STRING
  }
});

module.exports = Order;
