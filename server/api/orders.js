const router = require('express').Router();
const { Order, User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (req.query.userId) {
      const order = await Order.findOrCreate({
        where: {
          userId: req.query.userId,
          status: 'Cart'
        },
        defaults: { total: 0.0 }
      });
      res.json(order);
    } else {
      const orders = await Order.findAll();
      res.json(orders);
    }
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
