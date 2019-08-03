const router = require('express').Router();
const { ProductOrder, Order, Product } = require('../db/models');
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
    const existingEntryOnCart = await ProductOrder.findOne({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
    });

    const existingOrder = await Order.findByPk(req.body.orderId);
    const newItem = await Product.findByPk(req.body.productId);

    if (existingEntryOnCart === null) {
      const addStuff = await existingOrder.addProduct(newItem, {
        through: {
          quantity: req.body.quantity,
          unitPrice: req.body.unitPrice
        }
      });
      res.json(addStuff);
    } else {
      const currentQuantity = existingEntryOnCart.dataValues.quantity;
      const addStuff = await existingOrder.addProduct(newItem, {
        through: {
          quantity: Number(currentQuantity) + Number(req.body.quantity),
          unitPrice: req.body.unitPrice
        }
      });
      res.json(addStuff);
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
