import { pathExistsSync } from 'fs-extra'

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

// export async function getStaticProps() {
//   const { data: { site, posts } } = await allPosts()
//   return { props: { site, posts } }
// }

// {
//   name,
//   logo,
//   title,
//   author,
//   homepage,
//   description,
//   avatar,
//   links,
//   url
// }
