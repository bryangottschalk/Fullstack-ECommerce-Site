const router = require('express').Router();
const { ProductOrder } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await ProductOrder.findAll();
    res.json(allOrders);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const addToOrder = await ProductOrder.create(req.body);
    console.log('typeof req.body quantity', typeof req.body.quantity);
    console.log('typeof req.body unitPrice', typeof req.body.unitPrice);

    // console.log('addToOrder:', addToOrder, 'req.body', req.body);
    res.status(201).send(addToOrder);
  } catch (error) {
    next(error);
  }
});
