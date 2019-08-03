const router = require('express').Router();
const { ProductOrder, Order, User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (req.query.orderId) {
      const orderForOneUser = await ProductOrder.findAll({
        where: {
          orderId: req.query.orderId
        }
      });
      res.json(orderForOneUser);
    } else {
      const allOrders = await ProductOrder.findAll();
      res.json(allOrders);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const userOrder = await Order.findOne({
      where: {
        status: 'Cart',
        userId: req.user.id
      }
    });
    if (userOrder) {
      const order = await ProductOrder.findOne({
        where: {
          productId: req.body.productId,
          orderId: userOrder.id
        }
      });
      if (!order) {
        const newOrder = await ProductOrder.create({
          productId: req.body.productId,
          orderId: req.body.orderId,
          quantity: req.body.quantity
        });
        res.send(newOrder);
      } else {
        order.quantity += req.body.quantity;
        order.save();
        res.send(order);
      }
    } else {
      const newOrder = await Order.create({
        status: 'Cart'
      });
      const orderUser = await User.findOne({
        where: {
          id: req.user.id
        }
      });
      newOrder.setUser(orderUser);
      const newProductOrder = await ProductOrder.create({
        productId: req.body.productId,
        orderId: newOrder.id,
        quantity: req.body.quantity
      });
      res.status(201).send(newOrder);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    if (req.query.orderId && req.query.productId) {
      await ProductOrder.destroy({
        where: {
          orderId: req.params.orderId,
          productId: req.query.productId
        }
      });
      res.sendStatus(202);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    if (req.query.orderId && req.query.productId) {
      const itemToUpdate = await ProductOrder.findOne({
        where: {
          orderId: req.params.orderId,
          productId: req.params.productId
        }
      });
      const updatedItem = await itemToUpdate.update({
        quantity: req.body.quantity
      });
      res.json(updatedItem);
    }

    if (req.query.orderId && req.query.productId) {
      await ProductOrder.update({
        where: {
          orderId: req.params.orderId,
          productId: req.query.productId
        }
      });
      res.sendStatus(202);
    }
  } catch (error) {
    next(error);
  }
});
