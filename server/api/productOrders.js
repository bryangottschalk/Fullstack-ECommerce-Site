const router = require('express').Router();
const { ProductOrder } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await ProductOrder.findAll();
    res.send(allOrders);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log('REWQBOY', req.body);
    console.log('******************************');
    const order = await ProductOrder.findOne({
      where: {
        productId: req.body.productId,
        orderId: req.body.orderId
      }
    });
    if (!order) {
      console.log('REB', req.body);
      console.log('HELLOOOO');
      const newOrder = await ProductOrder.create({
        productId: req.body.productId,
        orderId: req.body.orderId,
        quantity: 1
      });
    } else {
      order.quantity++;
      order.save();
    }
  } catch (error) {
    next(error);
  }
});
