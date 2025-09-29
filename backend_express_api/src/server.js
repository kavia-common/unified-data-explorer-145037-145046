require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

if (!process.env.MONGODB_URI) {
  // eslint-disable-next-line no-console
  console.warn('Warning: MONGODB_URI environment variable is not set. Database queries will fail until it is provided.');
} else {
  // eslint-disable-next-line no-console
  console.log('MONGODB_URI detected. Backend will attempt to connect on startup.');
}

const server = app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://${HOST}:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = server;
