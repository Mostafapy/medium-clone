require('dotenv').config({ path: '.env' });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cloudinary = require('cloudinary');
// DB
const dbConfig = require('./config/db');
const { routes } = require('./routes');

/** configure cloudinary */
cloudinary.config({
  cloud_name: 'chidumennamdi',
  api_key: '',
  api_secret: ''
});

dbConfig();

// Initialize App
const app = express();

app.use(express.json());

// Use CORS
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(
    morgan((tokens, req, res) =>
      [
        `<${process.env.NODE_ENV}>`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
      ].join(' '),
    ),
  );
}

// Port
const port = process.env.PORT || '5000';

// routes
app.use(routes);

// Listen
const server = app.listen(port, () =>
  console.log(`App Listen Successfully To Port ${port}`),
);

// Unhandled Promise Rejection Handler
process.on('unhandledRejection', (ex) => {
  console.error(`${ex.message}`, ex);
  app.use((_req, res) => {
    res.status(500).json({
      success: false,
      msg: '500 Internet Error',
      data: null,
    });
  });

  server.close(() => process.exit(1));
});