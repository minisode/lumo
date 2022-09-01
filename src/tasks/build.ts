import { defineTask } from '@tossdev/click'
import { getConfig } from '../index'
import { Blog } from '../blog'

export const buildTask = defineTask({
  name: 'build',
  about: 'Build blog',
  handler(args, opts) {
    async function runTask() {
      const config = getConfig()
      const blog = new Blog(config)
      await blog.build()
    }

    runTask().catch(console.error)
  }
})
