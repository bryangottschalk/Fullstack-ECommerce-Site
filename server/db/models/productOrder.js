const Sequelize = require('sequelize');
const db = require('../db');

const ProductOrder = db.define('ProductOrder', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  unitPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = ProductOrder;
