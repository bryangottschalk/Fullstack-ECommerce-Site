const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    //for later, findall where status !== "Cart" (right now the data only has carts)
    console.log('req.user', req.user);
    const pastOrders = await Order.findAll({
      where: { userId: req.user.id },
      include: [{ all: true }]
    });
    console.log('pastOrders', pastOrders);
    res.json(pastOrders);
  } catch (error) {
    next(error);
  }
});
