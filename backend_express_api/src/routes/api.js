'use strict';
const express = require('express');
const GenericReadController = require('../controllers/genericReadController');
const Users = require('../models/users');
const SessionTracking = require('../models/sessionTracking');
const AppDeployments = require('../models/appDeployments');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: users
 *     description: Users referral data
 *   - name: session_tracking
 *     description: Session tracking data
 *   - name: app_deployments
 *     description: Application deployment records
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List users
 *     tags: [users]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: skip
 *         schema: { type: integer }
 *       - in: query
 *         name: sort
 *         schema: { type: string }
 *       - in: query
 *         name: q
 *         schema: { type: string, description: 'JSON stringified Mongo query object' }
 *     responses:
 *       200:
 *         description: A list of users
 */
const usersController = new GenericReadController(Users, 'users');
router.get('/users', usersController.list.bind(usersController));
router.get('/users/:id', usersController.getById.bind(usersController));

/**
 * @swagger
 * /api/session_tracking:
 *   get:
 *     summary: List session tracking items
 *     tags: [session_tracking]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: skip
 *         schema: { type: integer }
 *       - in: query
 *         name: sort
 *         schema: { type: string }
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: A list of session tracking items
 */
const sessionController = new GenericReadController(SessionTracking, 'session_tracking');
router.get('/session_tracking', sessionController.list.bind(sessionController));
router.get('/session_tracking/:id', sessionController.getById.bind(sessionController));

/**
 * @swagger
 * /api/app_deployments:
 *   get:
 *     summary: List app deployments
 *     tags: [app_deployments]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: skip
 *         schema: { type: integer }
 *       - in: query
 *         name: sort
 *         schema: { type: string }
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: A list of app deployments
 */
const deploymentsController = new GenericReadController(AppDeployments, 'app_deployments');
router.get('/app_deployments', deploymentsController.list.bind(deploymentsController));
router.get('/app_deployments/:id', deploymentsController.getById.bind(deploymentsController));

module.exports = router;
