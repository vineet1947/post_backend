const express = require('express');
const router = express.Router();
const noteController = require('../controllers/NoteController')
const dataValidator = require('../validators/DataValidator')
const validateMiddleware = require('../middlewares/validate')
// const cacheMiddleware = require('../middlewares/caching')

// Add cacheMiddleware() in between route functions to enable caching

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - title
 *         - body
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the note
 *         title:
 *           type: string
 *           description: The title of the note
 *         body:
 *           type: string
 *           description: The content of the note
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The creation date of the note
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The last update date of the note
 *       example:
 *         id: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         title: Example Note
 *         body: This is an example note.
 *         created_at: 2024-08-12T14:45:00Z
 *         updated_at: 2024-08-12T14:45:00Z
 */

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       201:
 *         description: The created note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Bad request
 */
router.post(
  '/notes',
  validateMiddleware(dataValidator),
  noteController.createNote
)

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get a note by id
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note id
 *     responses:
 *       200:
 *         description: The note data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 */
router.get('/notes/:id', noteController.getNoteById)

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Query notes by title substring
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: The substring to search for in the title
 *     responses:
 *       200:
 *         description: A list of matching notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
router.get('/notes', noteController.queryNotesByTitle)

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update an existing note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: The updated note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 *       400:
 *         description: Bad request
 */
router.put(
  '/notes/:id',
  validateMiddleware(dataValidator),
  noteController.updateNote
)

module.exports = router
