const express = require('express');

/** Controllers */
const {
  add,
  getById,
  follow,
  getProfile,
} = require('../controllers/user.controller');

const apiRoutes = express.Router();

apiRoutes.get(':id', getById);
apiRoutes.get('/profile/:id', getProfile);
apiRoutes.post('', add);
apiRoutes.post('/follow', follow);

module.exports = apiRoutes;
