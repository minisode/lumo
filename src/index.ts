import { pathExistsSync } from 'fs-extra'

type BlogLink = {
  title: string
  url: string
}

type BlogTheme = {
  components: {
    home: any
    page: any
    post: any
  }
}

type UserConfig = {
  logo?: string
  title: string
  author: string
  avatar?: string
  homepage?: string
  description?: string
  links?: BlogLink[]
  theme?: BlogTheme
}

function themeExists(theme: string) {
  return pathExistsSync(`node_modules/${theme}`)
}

export function createTheme(theme?: string) {
  const layoutPath =
    theme && themeExists(theme) ? `${theme}/dist/layouts` : './blog'

  return {
    components: {
      home: require(`${layoutPath}/home`),
      page: require(`${layoutPath}/page`),
      post: require(`${layoutPath}/post`)
    }
  }
}

export function blog(config: UserConfig) {
  config.theme ||= createTheme()
  return config
}
