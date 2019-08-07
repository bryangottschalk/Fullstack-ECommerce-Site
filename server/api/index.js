const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/checkout', require('./checkout'));
router.use('/products', require('./products'));
router.use('/categories', require('./categories'));
router.use('/productOrders', require('./productOrders'));
router.use('/orders', require('./orders'));
router.use('/reviews', require('./reviews'));
router.use('/categories', require('./categories'));
router.use('/pastOrders', require('./pastOrders'));
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
