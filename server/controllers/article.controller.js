const { asyncHandler } = require('../middlewares/async.middleware');
const articleService = require('../services/article.service');

const add = async (req, res, next) => {
  try {
    const { body } = req;
    const article = await articleService.add(body, req.files);
    res.send(article);
  } catch (err) {
    res.send(err);
  }
  next();
};

const getAll = async (req, res, next) => {
  try {
    const articles = await articleService.getAll(req.params.id);
    if (articles.length > 0) {
      articles.forEach(article => {
        res.send(article? article: 404);
      });
    }
  } catch (err) {
    res.send(err);
  }
  next();
};


const getById = async (req, res, next) => {
  try {
    const article = await articleService.findOneById(req.params.id);
    res.send(article);
  } catch (err) {
    res.send(err);
  }
  next();
};

const clap = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  
  articleService
    .clap(id)
    .then(() => res.status(200).json({ msg: 'Done' }));
});

const comment = asyncHandler(async (req, res, next) => {
  const { id, authorId, comment } = req.body;
    
  articleService
    .comment(id, { authorId, comment})
    .then(() => res.status(200).json({ msg: 'Done' }));
});

module.exports = {
  add,
  getAll,
  getById,
  clap,
  comment,
};
