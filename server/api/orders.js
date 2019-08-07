const router = require('express').Router();
const { Order } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    console.log('req.user:   ', req.user);
    console.log('req.query.userId:', req.query.userId);

    if (req.user === undefined || req.query.userId === undefined) {
      if (req.session.cartId === undefined) {
        const newOrder = await Order.create({
          status: 'Cart',
          total: 0.0
        });

        const newOrderId = newOrder.dataValues.id;
        req.session.cartId = newOrderId;

        res.json(newOrder);
      } else {
        // If req.session.cart is defined
        console.log('req.session already created', req.session.cartId);
        const order = await Order.findAll({
          where: {
            id: Number(req.session.cartId),
            status: 'Cart'
          }
        });
        // console.log('Found order', order);
        res.json(order);
      }
    } else if (req.query.userId) {
      // there is an userID and there is a query tag
      if (req.session.cartId) {
        const oldCartOrder = await Order.findOne({
          where: {
            status: 'Cart',
            userId: req.query.userId
          }
        });

        // If the user has an old cart
        if (oldCartOrder) {
          await oldCartOrder.update({
            userId: null
          });
        }

        // Assign the cart to the user
        const cartToUpdate = await Order.findByPk(Number(req.session.cartId));
        const AssignSessionCartToUser = await cartToUpdate.update({
          userId: req.query.userId
        });
        res.json(AssignSessionCartToUser);
      } else {
        // No order for user stored in session
        const order = await Order.findOrCreate({
          where: {
            userId: req.query.userId,
            status: 'Cart'
          },
          defaults: { total: 0.0 }
        });
        res.json(order);
      }

      console.log('session.cartId: ', req.session.cartId);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/all', async (req, res, next) => {
  try {
    const orders = await Order.findAll({ include: [{ all: true }] });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});
