const userRoutes = require('./user.route');
const articleRoutes = require('./article.route');

const routes = require('express').Router();
const apiRouter = require('express').Router();

// Routes
routes.use('/api/v1', apiRouter);

apiRouter.use('/users', userRoutes);
apiRouter.use('/articles', articleRoutes);

module.exports = { routes };