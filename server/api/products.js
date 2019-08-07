const router = require('express').Router();
const { Product, Review, Category } = require('../db/models');
const Sequelize = require('sequelize');
const isAdmin = require('../middleware');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (req.query.categoryTag) {
      const filteredProducts = await Product.findAll({
        include: [
          {
            model: Category,
            where: {
              name: {
                [Sequelize.Op.in]: [req.query.categoryTag]
              }
            }
          }
        ]
      });
      res.send(filteredProducts);
    } else if (req.query.searchTag) {
      const searchedProducts = await Product.findAll({
        where: {
          name: {
            [Sequelize.Op.iLike]: '%' + req.query.searchTag + '%'
          }
        }
      });
      res.send(searchedProducts);
    } else {
      const products = await Product.findAll();

      products.map(async product => {
        const productInfo = await Product.findByPk(product.id);
        const avg = await productInfo.getAverageRating();

        await productInfo.update({ avgStar: avg });
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

router.delete('/:productId', isAdmin, async (req, res, next) => {
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

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    next(err);
  }
});

//PUT /api/products/:productId
router.put('/:productId', async (req, res, next) => {
  try {
    const productToEdit = await Product.findByPk(Number(req.params.productId));
    const product = await productToEdit.update(req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
});
