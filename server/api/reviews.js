const router = require('express').Router();
const { Review } = require('../db/models');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
});
