#!/usr/bin/env node
require('yargs')
  .usage('Usage: $0 <command> [options]')
  .commandDir('../lib/commands')
  .detectLocale(false)
  .demandCommand()
  .help()
  .argv
