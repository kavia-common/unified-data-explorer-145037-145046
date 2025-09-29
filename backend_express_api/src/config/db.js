'use strict';
/**
 * MongoDB connection module using Mongoose.
 * Reads connection string from environment variable MONGODB_URI.
 */

const mongoose = require('mongoose');

/**
 * Establishes connection to MongoDB with sensible defaults.
 * The connection is created once and reused across the app.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    // Provide a descriptive error to guide env setup
    throw new Error('Missing MONGODB_URI environment variable. Please set it in the backend .env file.');
  }

  // Avoid creating multiple connections in dev with hot-reload
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    autoIndex: true,
    serverSelectionTimeoutMS: 10000,
    // retryWrites can be enabled for most MongoDB clusters
  });

  // Basic listeners for visibility
  mongoose.connection.on('connected', () => {
    // eslint-disable-next-line no-console
    console.log('MongoDB connected');
  });
  mongoose.connection.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', err.message);
  });

  return mongoose.connection;
}

module.exports = {
  connectDB,
};
