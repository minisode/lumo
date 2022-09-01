import { Layout } from './default'
import PostItem from './components/post-item'

export default function HomeComponent({ site, posts }) {
  return (
    <Layout>
      <ul>
        {posts.map((props, _) => (
          <PostItem {...props} />
        ))}
      </ul>
    </Layout>
  )
}
