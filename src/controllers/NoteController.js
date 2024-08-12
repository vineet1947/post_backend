const noteService = require('../services/noteService')
const messageBuilder = require('../utils/message_builder')

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const note = await noteService.createNote(req.body)
    res.status(201).json(messageBuilder.successResponse(201, note))
  } catch (error) {
    console.error(error.message)
    res.status(500).json(messageBuilder.errorResponse(500, error.message))
  }
}
exports.getNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1 // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10 // Default to 10 items per page if not specified

    // Fetch notes and total count
    const skip = (page - 1) * limit
    const notes = await noteService.getNotes(page, limit)
    const totalCount = await noteService.getTotalCount() // Assuming this method exists in your service layer
    const totalPages = Math.ceil(totalCount / limit)

    const response = {
      result: notes,
      totalItems: totalCount,
      totalPages: totalPages,
      currentPage: page,
      itemsPerPage: limit,
    }

    res.status(200).json(messageBuilder.successResponse(200, response))
  } catch (error) {
    console.error(error.message)
    res.status(500).json(messageBuilder.errorResponse(500, error.message))
  }
}
// Get a note by its ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await noteService.getNoteById(req.params.id)
    if (!note) {
      return res
        .status(404)
        .json(messageBuilder.errorResponse(404, 'Note not found'))
    }
    res.status(200).json(messageBuilder.successResponse(200, note))
  } catch (error) {
    console.error(error.message)
    res.status(500).json(messageBuilder.errorResponse(500, error.message))
  }
}

exports.queryNotesByTitle = async (req, res) => {
  try {
    const titleSubstring = req.query.title || ''
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    // Handle pagination in the controller
    const skip = (page - 1) * limit

    // Fetch notes and total count from the service
    const notes = await noteService.queryNotesByTitle(
      titleSubstring,
      skip,
      limit
    )
    const totalCount = await noteService.getTotalCountByTitle(titleSubstring)
    const totalPages = Math.ceil(totalCount / limit)

    const response = {
      result: notes,
      totalItems: totalCount,
      totalPages: totalPages,
      currentPage: page,
      itemsPerPage: limit,
    }

    res.status(200).json(messageBuilder.successResponse(200, response))
  } catch (error) {
    console.error(error.message)
    res.status(500).json(messageBuilder.errorResponse(500, error.message))
  }
}

// Update an existing note
exports.updateNote = async (req, res) => {
  try {
    const note = await noteService.updateNote(req.params.id, req.body)
    if (!note) {
      return res
        .status(404)
        .json(messageBuilder.errorResponse(404, 'Note not found'))
    }
    res.status(200).json(messageBuilder.successResponse(200, note))
  } catch (error) {
    console.error(error.message)
    res.status(500).json(messageBuilder.errorResponse(500, error.message))
  }
}
 
exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id
    const deletedNote = await noteService.deleteNote(noteId)

    if (!deletedNote) {
      return res
        .status(404)
        .json(messageBuilder.errorResponse(404, 'Note not found'))
    }

    res
      .status(200)
      .json(
        messageBuilder.successResponse(200, {
          message: 'Note deleted successfully',
        })
      )
  } catch (error) {
    console.error(error.message)
    res.status(500).json(messageBuilder.errorResponse(500, error.message))
  }
}