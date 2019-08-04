const router = require('express').Router();
const { Category } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const category = await Category.findAll();
    res.json(category);
  } catch (err) {
    next(err);
  }
});
