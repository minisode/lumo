#!/usr/bin/env node
const { click } = require('@tossdev/click')
const { buildTask } = require('../dist/tasks/build')
const { previewTask } = require('../dist/tasks/preview')

click
  .program('lumo')
  .addTask(buildTask)
  .addTask(previewTask)
  .execute()
