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
    // console.log('AAAAAA orderId:    ', req.body.orderId);
    if (req.user === undefined) {
      // user not logged in
      const existingEntryOnCart = await ProductOrder.findOne({
        where: {
          orderId: req.session.cartId,
          productId: req.body.productId
        }
      });

      const existingOrder = await Order.findByPk(req.body.orderId);
      const newItem = await Product.findByPk(req.body.productId);

      if (existingEntryOnCart === null) {
        const addStuff = await existingOrder.addProduct(newItem, {
          through: {
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice,
            productName: req.body.productName,
            imageUrl: req.body.imageUrl
          }
        });
        res.json(addStuff);
      } else {
        const currentQuantity = existingEntryOnCart.dataValues.quantity;
        const addStuff = await existingOrder.addProduct(newItem, {
          through: {
            quantity: Number(currentQuantity) + Number(req.body.quantity),
            unitPrice: req.body.unitPrice,
            productName: req.body.productName,
            imageUrl: req.body.imageUrl
          }
        });
        res.json(addStuff);
      }
    } else {
      // user logged in
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
            unitPrice: req.body.unitPrice,
            productName: req.body.productName,
            imageUrl: req.body.imageUrl
          }
        });
        res.json(addStuff);
      } else {
        const currentQuantity = existingEntryOnCart.dataValues.quantity;
        const addStuff = await existingOrder.addProduct(newItem, {
          through: {
            quantity: Number(currentQuantity) + Number(req.body.quantity),
            unitPrice: req.body.unitPrice,
            productName: req.body.productName,
            imageUrl: req.body.imageUrl
          }
        });
        res.json(addStuff);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:productOrderId', async (req, res, next) => {
  try {
    await ProductOrder.destroy({
      where: {
        id: req.params.productOrderId
      }
    });
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    if (req.query.orderId && req.query.productId) {
      const itemToUpdate = await ProductOrder.findOne({
        where: {
          orderId: req.query.orderId,
          productId: req.query.productId
        }
      });
      const updatedItem = await itemToUpdate.update({
        quantity: req.body.quantity
      });
      res.json(updatedItem);
    }
  } catch (error) {
    next(error);
  }
});
