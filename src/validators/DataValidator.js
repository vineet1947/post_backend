const generateValidatorFromModel = require('../utils/generateValidatorFromModel')
const leaderboardModel = require('../models/noteModel')

const exampleValidator = generateValidatorFromModel(leaderboardModel)

module.exports = exampleValidator
