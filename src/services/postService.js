const ExampleModel = require('../models/PostModel')

exports.getExamples = async () => {
  const exampleData = await ExampleModel.find()
  return exampleData
}

exports.getExampleById = async (id) => {
  // How to write test cases for this
  const example = await ExampleModel.findById(id)
  return example
}

exports.createExample = async (data) => {
  const newExample = new ExampleModel(data)
  const savedExample = await newExample.save()
  return savedExample
}

exports.updateExample = async (id, data) => {
  const updatedExample = await ExampleModel.findByIdAndUpdate(id, data, {
    new: true,
  })
  return updatedExample
}

exports.deleteExample = async (id) => {
  const deletedExample = await ExampleModel.findByIdAndDelete(id)
  return deletedExample
}
