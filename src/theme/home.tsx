import PostItem from './components/post-item'
import Layout from './default'

export default function HomeLayout({ site }: { site: Record<string, any> }) {
  return (
    <Layout site={site}>
      <ul>
        {site.posts.map((props, _) => (
          <PostItem {...props} />
        ))}
      </ul>
    </Layout>
  )
}
