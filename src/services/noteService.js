const NoteModel = require('../models/noteModel')

// Fetch all notes
exports.getNotes = async (page, limit) => {
  const skip = (page - 1) * limit
  const notes = await NoteModel.find().skip(skip).limit(limit)
  return notes
}

// Fetch a note by its ID
exports.getNoteById = async (id) => {
  const note = await NoteModel.findById(id)
  return note
}

// Create a new note
exports.createNote = async (data) => {
  const newNote = new NoteModel(data)
  const savedNote = await newNote.save()
  return savedNote
}

// Update an existing note by its ID
exports.updateNote = async (id, data) => {
  const updatedNote = await NoteModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
  return updatedNote
}

// Delete a note by its ID
exports.deleteNote = async (id) => {
  const deletedNote = await NoteModel.findByIdAndDelete(id)
  return deletedNote
}

// Query notes by title substring
exports.queryNotesByTitle = async (titleSubstring, page, limit) => {
  const skip = (page - 1) * limit
  const notes = await NoteModel.find({
    title: { $regex: titleSubstring, $options: 'i' },
  })
    .skip(skip)
    .limit(limit)

  const totalCount = await NoteModel.countDocuments({
    title: { $regex: titleSubstring, $options: 'i' },
  })
  const totalPages = Math.ceil(totalCount / limit)

  return {
    result: notes,
    totalItems: totalCount,
    totalPages,
    currentPage: page,
    itemsPerPage: limit,
  }
}
