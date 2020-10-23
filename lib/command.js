const commands = {
  build: 'Build your API files',
  clean: 'Clean your API files',
  serve: 'Serve your API locally'
}

function command(name, options) {
  return {
    ...options,
    command: name,
    description: commands[name]
  }
}

module.exports = command
