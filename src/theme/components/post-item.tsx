export default function PostItem(props: {
  title: string
  date: string
  url: string
}) {
  return (
    <li class="py-3">
      <time class="text-sm text-gray-600">{props.date}</time>
      <h3>
        <a
          href={props.url}
          class="font-bold text-lg leading-10 underline truncate"
        >
          {props.title}
        </a>
      </h3>
    </li>
  )
}

// dayjs(time).format('ll')
