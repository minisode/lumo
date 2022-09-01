import PostHead from './components/post-head'
import { Layout } from './default'

export default function PostComponent({ site, title, body, time, type }) {
  return (
    <Layout>
      {type === 'post' && <PostHead {...{ title, time }} />}
      <div class="markdown-body" dangerouslySetInnerHTML={{ __html: body }} />
    </Layout>
  )
}
