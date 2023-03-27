const { asyncHandler } = require('../middlewares/async.middleware');
const userService = require('../services/user.service');

const add = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await userService.save(body);
    res.send(user);
  } catch (err) {
    res.send(err);
  }
  next();
};

const getById = async (req, res, next) => {
  try {
    const user = await userService.findOneById(req.params.id);
    res.send(user);
  } catch (err) {
    res.send(err);
  }
  next();
};

const follow = asyncHandler(async (req, res, next) => {
  const { id, userId } = req.body;

  userService
    .follow(id, userId)
    .then(() => res.status(200).json({ msg: 'followed' }));
});

const getProfile = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;
  const response = await userService.getProfile(req.params.id, userId);
  res.status(200).json(response);
});

return {
  add,
  getById,
  follow,
  getProfile,
};
