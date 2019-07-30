const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.ARRAY(
      Sequelize.ENUM('category1', 'category2', 'category3')
    ),
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://placekitten.com/200/300'
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0.0,
      max: 9999999.99999
    },
    allowNull: false
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  availability: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Product;
