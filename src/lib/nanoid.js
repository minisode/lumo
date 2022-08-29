const { customAlphabet } = require('nanoid')
const generate = customAlphabet('1234567890abcdef', 12)

module.exports = { generate }
