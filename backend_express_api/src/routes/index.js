const express = require('express');
const mongoose = require('mongoose');
const healthController = require('../controllers/health');

const router = express.Router();
// Health endpoint

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

/**
 * @swagger
 * /health/db:
 *   get:
 *     summary: Database connection health
 *     description: Returns the current MongoDB connection status using Mongoose readyState.
 *     tags:
 *       - health
 *     responses:
 *       200:
 *         description: MongoDB connection state with metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Human-readable connection status
 *                   example: connected
 *                 readyState:
 *                   type: integer
 *                   description: Mongoose readyState (0-3)
 *                   example: 1
 *                 host:
 *                   type: string
 *                   nullable: true
 *                 name:
 *                   type: string
 *                   nullable: true
 *                 models:
 *                   type: integer
 *                   description: Number of registered Mongoose models
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
// PUBLIC_INTERFACE
router.get('/health/db', (req, res) => {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  const payload = {
    status: states[state] || 'unknown',
    readyState: state,
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null,
    models: Object.keys(mongoose.connection.models || {}).length,
    timestamp: new Date().toISOString(),
  };
  // eslint-disable-next-line no-console
  console.log('DB health check:', payload);
  return res.status(200).json(payload);
});

module.exports = router;
