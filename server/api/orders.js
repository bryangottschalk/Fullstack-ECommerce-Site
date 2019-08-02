const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

// router.get('/:userId', async (req, res, next) => {
//   try {
//     const order = await Order.findOrCreate({
//       where: {
//         userId: req.params.userId,
//         status: 'Cart'
//       }
//     });
//     res.send(order);
//   } catch (error) {
//     next(error);
//   }
// });

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll();
    res.send(allOrders);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log('reqbod', req.body);

    const order = await Order.create(req.body);
    res.status(201).send(order);
  } catch (error) {
    next(error);
  }
});
