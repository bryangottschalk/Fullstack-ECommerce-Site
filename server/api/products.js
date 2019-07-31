const router = require('express').Router();
const { Product } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    console.log('prod', products);
    res.send(products);
  } catch (err) {
    next(err);
  }
});
