const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
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
  },
  avgStar: {
    type: Sequelize.INTEGER
  }
});

Product.prototype.getAverageRating = async function() {
  const allReview = await this.getReviews({
    where: { productId: this.id }
  });

  if (allReview.length === 0) {
    return undefined;
  }

  let stars = [];

  for (let i = 0; i < allReview.length; i++) {
    stars.push(allReview[i].star);
  }
  const total = stars.reduce((acc, c) => acc + c, 0);
  const average = Math.round(total / stars.length);

  return average;
};

module.exports = Product;
