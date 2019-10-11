const router = require('express').Router();
const { Order } = require('../db/models');

module.exports = router;

router.post('/newCart', async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//new route to get cartId
router.get('/unauthCart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        sessionID: req.sessionID
      }
    });
    if (order) {
      res.json(order.dataValues.id);
    } else {
      const err = new Error(`couldn't find unauth cart!`);
      throw err;
    }
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.query.userId,
        status: 'Cart'
      },
      defaults: { total: 0.0 }
    });
    if (order) {
      res.json(order);
    } else {
      Order.create({
        status: 'cart',
        total: 0.0,
        sessionID: req.sessionID
      });
    }

    if (req.user === undefined || req.query.userId === undefined) {
      if (req.session.cartId === undefined) {
        const newOrder = await Order.create({
          status: 'Cart',
          total: 0.0
        });

        req.session.cartId = req.sessionID;

        res.json(newOrder);
      } else {
        // If req.session.cart is defined
        const order = await Order.findAll({
          where: {
            id: Number(req.session.cartId),
            status: 'Cart'
          }
        });
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
      }
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
