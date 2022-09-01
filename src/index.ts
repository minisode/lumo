import { getLayoutPath } from './utils'

type BlogLink = {
  title: string
  url: string
}

type BlogTheme = {
  components: {
    home: unknown
    page: unknown
    post: unknown
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

export function createTheme(theme?: string) {
  const layoutPath = getLayoutPath(theme)
  return {
    components: {
      home: require(`${layoutPath}/home`),
      page: require(`${layoutPath}/page`),
      post: require(`${layoutPath}/post`)
    }
  }
}

function getUserConfig() {
  return require(`${process.cwd()}/lumo.js`)
}

export function blog(config: UserConfig) {
  config.theme ||= createTheme()
  return config
}

// const [] =
