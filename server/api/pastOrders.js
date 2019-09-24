const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const pastOrders = await Order.findAll({
      where: { userId: req.user.id },
      include: [{ all: true }]
    });
    res.json(pastOrders);
  } catch (error) {
    next(error);
  }
});

router.get('/allOrders', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll();
    res.json(allOrders);
  } catch (error) {
    next(error);
  }
});
