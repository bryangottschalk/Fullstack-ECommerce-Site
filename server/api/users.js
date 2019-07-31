const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName', 'address']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    });
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      const err = new Error("couldn't find product");
      err.status = 404;
      throw err;
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    next(err);
  }
});
