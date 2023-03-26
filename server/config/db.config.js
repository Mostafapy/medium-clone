const mongoose = require('mongoose');
const connectDB = require('../helpers/connectDB.helper');

const db = async () => {
  // For nodemon restarts
  process.once('SIGUSR2', () => {
    mongoose.connection
      .close()
      .then(() => {
        console.log('@process.on(`SIGUSR2`)');
        process.kill(process.pid, 'SIGUSR2');
      })
      .catch(err => {
        console.error(
          '@process.on(`SIGUSR2`) [error: %s]',
          err.message,
        );
        process.kill(process.pid, 'SIGUSR2');
      });
  });

  // For app termination to make sure that the connection is closed
  process.on('SIGINT', () => {
    mongoose.connection
      .close()
      .then(() => {
        console.log(
          '@process.on(`SIGINT`) termination (SIGINT)'
            .bold,
        );
        process.exit(0);
      })
      .catch(err => {
        console.error('@process.on(`SIGINT`) [error: %s]', err.message);
        process.exit(0);
      });
  });

  try {
    // Connect mongo DB
    await connectDB();

    console.log('Successfully connected to mongoDB'.green.underline.bold);
  } catch (err) {
    console.error(
      '@mongoose.connect() failed connect to mongoDB [error: %s]'.red
        .underline.bold,
      err.message,
    );
    mongoose.connection
      .close()
      .then(() => {
        process.exit(1);
      })
      .catch(() => {
        process.exit(1);
      });
  }
};

module.exports = db;