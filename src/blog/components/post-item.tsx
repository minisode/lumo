type PostItemProps = {
  title: string
  slug: string
  time: string
}

export default function PostItem({ title, slug, time }: PostItemProps) {
  return (
    <li class="py-3">
      <time class="text-sm text-gray-600">{time}</time>
      <h3>
        <a
          href={`/${slug}`}
          class="font-bold text-lg leading-10 underline truncate"
        >
          {title}
        </a>
      </h3>
    </li>
  )
}
