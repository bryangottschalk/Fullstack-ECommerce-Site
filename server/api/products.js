const router = require('express').Router();
const { Product, Review, Category } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (req.query.categoryId) {
      const productForOneCategory = await Category.findAll({
        where: {
          id: req.query.categoryId
        },
        include: [
          {
            model: Product
          }
        ]
      });
      res.json(productForOneCategory[0].products);
    } else {
      const products = await Product.findAll();

      products.map(async product => {
        const productInfo = await Product.findByPk(product.id);
        const avg = await productInfo.getAverageRating();

        await productInfo.update({ avgStar: avg });

        // product.dataValues.avgStar = avg;
        // console.log('dataValues: ', product.dataValues);
      });
      res.json(products);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Review },
        {
          model: Category,
          through: { attributes: [] }
        }
      ]
    });

    if (!product) {
      const err = new Error("couldn't find product");
      err.status = 404;
      throw err;
    } else {
      const avg = await product.getAverageRating();
      await product.update({ avgStar: avg });
      res.status(200).json(product);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    });
    res.sendStatus(202);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    next(err);
  }
});
