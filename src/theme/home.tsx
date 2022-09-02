import { Layout } from './default'
import PostItem from './components/post-item'

export default function HomeComponent({ site }) {
  return (
    <Layout>
      <ul>
        {site.posts.map((props, _) => (
          <PostItem {...props} />
        ))}
      </ul>
    </Layout>
  )
}
