const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      const err = new Error('NOT AUTHORIZED');
      err.status = 404;
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

module.exports = isAdmin;
