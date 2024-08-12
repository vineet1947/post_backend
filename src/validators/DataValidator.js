const generateValidatorFromModel = require('../utils/generateValidatorFromModel')
const leaderboardModel = require('../models/PostModel')

const exampleValidator = generateValidatorFromModel(leaderboardModel)

module.exports = exampleValidator
