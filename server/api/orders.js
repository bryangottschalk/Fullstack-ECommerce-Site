const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.get('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'Cart'
      }
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// router.post('/:userId', async (req, res, next) => {
//   try {
//     const order = await Order.create(req.body)
//   } catch (error) {
//     next(error)
//   }
// })
