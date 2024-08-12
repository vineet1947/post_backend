const express = require('express');
const router = express.Router();
const leaderController = require('../controllers/PostController')
const dataValidator = require('../validators/DataValidator');
const validateMiddleware = require('../middlewares/validate');
const cacheMiddleware = require('../middlewares/caching')

// Add cacheMiddleware() in between route functions to enable caching

/**
 * @swagger
 * components:
 *   schemas:
 *     Example:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the example
 *         name:
 *           type: string
 *           description: The name of the example
 *         description:
 *           type: string
 *           description: The description of the example
 *       example:
 *         id: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         name: Example 1
 *         description: This is an example
 */

/**
 * @swagger
 * /api/leaderboards:
 *   get:
 *     summary: Get all examples
 *     tags: [Examples]
 *     responses:
 *       200:
 *         description: The list of examples
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Example'
 */
router.post('/postResult',validateMiddleware(dataValidator),  leaderController.postResult);

/**
 * @swagger
 * /examples/{id}:
 *   get:
 *     summary: Get an example by id
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The example id
 *     responses:
 *       200:
 *         description: The example data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Example'
 *       404:
 *         description: Example not found
 */
router.get('/getResultsSorted', leaderController.getResultsSorted);

/**
 * @swagger
 * /examples:
 *   post:
 *     summary: Create a new example
 *     tags: [Examples]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Example'
 *     responses:
 *       201:
 *         description: The created example
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Example'
 *       400:
 *         description: Bad request
 */
router.get('/getAllResults', leaderController.getResultsSorted);

router.get('/getAllResultbyId', leaderController.getItemsByPlayerId);

router.post('/postPlayerResult',validateMiddleware(dataValidator),  leaderController.postPlayerResult);

module.exports = router;