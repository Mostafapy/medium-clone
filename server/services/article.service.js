const articleModel = require('../models/article.model');
const cloudinary = require('cloudinary');

const save = async (articleObj) => {
  try {
    const newArticle = await new articleModel(articleObj).save();
    return Promise.resolve(newArticle);
  } catch (err) {
    return Promise.reject(err);
  }
};

const add = async (newArticleData, file) => {
  const { text, title, claps, description } = newArticleData;
  if (file.image) {
    cloudinary.uploader.upload(
      file.image.path,
      (result) => {
        const obj = {
          text,
          title,
          claps,
          description,
          feature_img: result.url != null ? result.url : '',
        };

        save(obj);
      },
      {
        resource_type: 'image',
        eager: [{ effect: 'sepia' }],
      },
    );
  } else {
    save({ text, title, claps, description, feature_img: '' });
  }
};

const getAll = async (id) => {
  try {
    return articleModel
      .find(id)
      .populate('author')
      .populate('comments.author')
      .exec();
  } catch (err) {
    return Promise.reject(err);
  }
};

const clap = async (id) => {
  try {
    const article = await articleModel.findById(id);
    await article.claps();
    return Promise.resolve({ msg: 'Done' });
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};

const comment = async (id, commentBody) => {
  try {
    const article = await articleModel.findById(id);
    const { comment, authorId } = commentBody;
    await article.comments({
      author: authorId,
      text: comment,
    });
    return Promise.resolve({ msg: 'Done' });
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};

const findOneById = async (id) => {
  try {
    const article = await articleModel
      .findOneById(id)
      .populate('author')
      .populate('comments.author')
      .exec();
    return Promise.resolve(article ? article : 404);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports = {
  add,
  findOneById,
  clap,
  comment,
  getAll,
};
