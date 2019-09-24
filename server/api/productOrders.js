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
    if (!req.body.orderId) {
      // user not logged in --> find or create an order using sessionID instead
      // create a ProductOrder entry
      let sessionID = req.sessionID;

      const order = await Order.findOrCreate({
        where: {
          status: 'Cart',
          total: 0.0,
          sessionID: sessionID
        }
      });

      const productOrder = await ProductOrder.create({
        productId: req.body.productId,
        orderId: order[0].dataValues.id,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        productName: req.body.productName,
        imageUrl: req.body.imageUrl
      });
      res.json(productOrder);
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
        const updatedItem = await existingEntryOnCart.update({
          quantity: Number(currentQuantity) + Number(req.body.quantity)
        });
        res.json(updatedItem);
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
