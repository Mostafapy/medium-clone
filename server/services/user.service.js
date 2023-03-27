const articleModel = require('../models/article.model');
const userModel = require('../models/user.model');

const save = async (newUserData) => {
  try {
    const newUser = await new userModel(newUserData).save();
    return Promise.resolve(newUser);
  } catch (err) {
    return Promise.reject(err);
  }
};

const findOneById = async (id) => {
  try {
    const user = await userModel.findOneById(id);
    return Promise.resolve(user? user: 404);
  } catch (err) {
    return Promise.reject(err);
  }
};

const followUser = async (id, userId) => {
  try {
    const user = await userModel.findOneById(id);
    await user.follow(userId);
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};

const getUserProfile = async (id) => {
  try {
    const user = await userModel.findOneById(id);
    const users = await userModel.find({ following: id });
    if (users.length > 0) {
      users.forEach(usr => user.addFollower(usr));
    }
    const articles = await articleModel.find({ author: id });

    return Promise.resolve({ user, articles });
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};

module.exports = {
  save,
  findOneById,
  followUser,
  getUserProfile
};