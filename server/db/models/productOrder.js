const Sequelize = require('sequelize');
const db = require('../db');

const ProductOrder = db.define('ProductOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  unitPrice: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
});

module.exports = ProductOrder;
