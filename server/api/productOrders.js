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
    console.log('req.body', req.body);

    if (!req.body.orderId) {
      // user not logged in
      // find or create an order
      // create a ProductOrder entry
      let sessionID = req.sessionID;

      const order = await Order.findOrCreate({
        where: {
          status: 'Cart',
          total: 0.0,
          sessionID: req.sessionID
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
      // console.log('ORDER HERE', order)
      // const orderUserId = order.dataValues.userId;
      // console.log('TCL: orderUserId', orderUserId);

      // console.log('req.body HERE', req.body);

      // const length = await ProductOrder.count();
      // where: {orderId: cartOrder.id}

      // console.log('TCL: length', length);

      // const length = await ProductOrder.count({
      //   where: {orderId: cartOrder.id}
      // })

      // might need this later
      // const existingEntryOnCart = await ProductOrder.findOne({
      //   where: {
      //     sessionID: sessionID,
      //     productId: req.body.productId
      //   }
      // });
      // console.log('TCL: existingEntryOnCart ', existingEntryOnCart);

      // const existingOrder = await Order.findOne({
      //   where: {
      //     sessionID: sessionID
      //   }
      // });
      // console.log('TCL: existingOrder', existingOrder);

      // const newItem = await Product.findByPk(req.body.productId);

      // if (existingEntryOnCart === null) {
      //   const addStuff = await existingOrder.addProduct(newItem, {
      //     through: {
      //       quantity: req.body.quantity,
      //       unitPrice: req.body.unitPrice,
      //       productName: req.body.productName,
      //       imageUrl: req.body.imageUrl
      //     }
      //   });
      //   res.json(addStuff);
      // }

      //else {
      //   const currentQuantity = existingEntryOnCart.dataValues.quantity;
      //   const updatedItem = await existingEntryOnCart.update({
      //     quantity: Number(currentQuantity) + Number(req.body.quantity)
      //   });
      //   res.json(updatedItem);
      // }
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
