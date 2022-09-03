export default function PostHead(props: {
  author: string
  title: string
  time: string
}) {
  return (
    <div class="leading-10 mb-4">
      <h1 class="font-bold text-3xl">{props.title}</h1>
      <div class="text-gray-500">Edited on {props.time}</div>
    </div>
  )
}

// dayjs(time).format('LL')
