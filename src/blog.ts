import { createPage } from './page'
import glob from 'fast-glob'

function getPaths() {
  return glob.sync('dist/contents/**/*.md')
}

export class Blog {
  readonly paths: string[]
  readonly posts: any[]

  constructor(config: any) {
    this.paths = getPaths()
  }

  async build() {
    for (const path of this.paths) {
      const page = createPage(path)
      await page.outputHtml()

      if (page.layout === 'post') {
        this.posts.push(page)
      }
    }
  }
}

// Content title? layout?(post) date? draft:false!
//   filter draft invalid_date
