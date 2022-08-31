import { defineTask } from '@tossdev/click'
import { createServer } from 'http'
import serve from 'serve-handler'

export const previewTask = defineTask({
  name: 'preview',
  about: 'Preview blog',
  handler(args, opts) {
    const port = opts.port || opts.p || 3323
    const server = createServer((request, response) => {
      serve(request, response, {
        public: 'dist'
      })
    })

    server.listen(port, () => {
      console.log(`* Listening on http://localhost:${port}`)
      console.log('* Use Ctrl-C to stop')
    })
  }
})
