const router = require('express').Router();
const { Order } = require('../db/models');
const isAdmin = require('../middleware');

module.exports = router;

router.get('/', isAdmin, async (req, res, next) => {
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

// router.get('/', async (req, res, next) => {
//   try {
//     const allOrders = await Order.findAll();
//     res.send(allOrders);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/', async (req, res, next) => {
//   try {
//     console.log('reqbod', req.body);

//     const order = await Order.create(req.body);
//     res.status(201).send(order);
//   } catch (error) {
//     next(error);
//   }
// });
