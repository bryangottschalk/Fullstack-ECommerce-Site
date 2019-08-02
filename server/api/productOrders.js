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
    const order = await ProductOrder.findOne({
      where: {
        productId: req.body.productId,
        orderId: req.body.orderId
      }
    });
    if (!order) {
      const newOrder = await ProductOrder.create({
        productId: req.body.productId,
        orderId: req.body.orderId,
        quantity: 1
      });
      res.send(newOrder);
    } else {
      order.quantity++;
      order.save();
      res.send(order);
    }
  } catch (error) {
    next(error);
  }
});
