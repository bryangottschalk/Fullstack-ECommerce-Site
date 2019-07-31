const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.get('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'Cart'
      }
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
});
