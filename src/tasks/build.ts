import { defineTask } from '@tossdev/click'
import { Blog } from '../blog'

export const buildTask = defineTask({
  name: 'build',
  about: 'Build blog',
  handler(args, opts) {
    async function runTask() {
      const blog = new Blog()
      await blog.build()
    }

    runTask().catch(console.error)
  }
})
