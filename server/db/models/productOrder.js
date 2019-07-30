const Sequelize = require('sequelize');
const db = require('../db');

const ProductOrder = db.define('ProductOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  unitPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

module.exports = ProductOrder;
