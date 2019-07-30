const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  link: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
    allowNull: false
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productList: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
});

module.exports = Order;
