const express = require('express');

/** Controllers */
const {
  add,
  clap,
  comment,
  getAll,
  getById,
} = require('../controllers/article.controller');

const apiRoutes = express.Router();

apiRoutes.get(':id', getById);
apiRoutes.get('', getAll);
apiRoutes.post('', add);
apiRoutes.post('/comment', comment);
apiRoutes.post('/clap', clap);

module.exports = apiRoutes;
