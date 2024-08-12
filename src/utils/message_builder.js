const messageBuilder = {
  successResponse: (code, result) => ({
    success: true,
    code: code,
    result: result,
  }),

  errorResponse: (code, message) => ({
    success: false,
    code: code,
    message: message,
  }),
}

module.exports = messageBuilder
