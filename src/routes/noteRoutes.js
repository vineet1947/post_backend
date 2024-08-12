const express = require('express');
const router = express.Router();
const noteController = require('../controllers/NoteController')
const dataValidator = require('../validators/DataValidator')
const validateMiddleware = require('../middlewares/validate')

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
 *     summary: Fetch all notes with pagination
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A list of notes with pagination metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Note'
 *                 totalItems:
 *                   type: integer
 *                   description: The total number of notes
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number
 *                 itemsPerPage:
 *                   type: integer
 *                   description: The number of items per page
 *       500:
 *         description: Internal server error
 */
router.get('/notes', noteController.getNotes);

/**
 * @swagger
 * /api/notes-by-title:
 *   get:
 *     summary: Query notes by title substring
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: The substring to search for in the title
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A list of matching notes with pagination metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Note'
 *                 totalItems:
 *                   type: integer
 *                   description: The total number of matching notes
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number
 *                 itemsPerPage:
 *                   type: integer
 *                   description: The number of items per page
 *       500:
 *         description: Internal server error
 */
router.get('/notes-by-title', noteController.queryNotesByTitle)

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

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note by id
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
 *         description: The deleted note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 */
router.delete('/notes/:id', noteController.deleteNote)

module.exports = router
