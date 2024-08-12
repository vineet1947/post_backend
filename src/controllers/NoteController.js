const noteService = require('../services/noteService')

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const note = await noteService.createNote(req.body)
    res.status(201).json({ success: true, code: 201, result: note })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

// Get a note by its ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await noteService.getNoteById(req.params.id)
    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }
    res.status(200).json(note)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

// Query notes by title substring
exports.queryNotesByTitle = async (req, res) => {
  try {
    const titleSubstring = req.query.title || ''
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const notes = await noteService.queryNotesByTitle(
      titleSubstring,
      page,
      limit
    )

    res.status(200).json(notes)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

// Update an existing note
exports.updateNote = async (req, res) => {
  try {
    const note = await noteService.updateNote(req.params.id, req.body)
    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }
    res.status(200).json(note)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}
