const NoteModel = require('../models/noteModel')

// Fetch all notes
exports.getNotes = async () => {
  const notes = await NoteModel.find()
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
