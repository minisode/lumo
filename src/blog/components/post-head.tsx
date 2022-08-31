type PostHeadProps = {
  title: string
  time: string
}

export default function PostHead({ title, time }: PostHeadProps) {
  return (
    <div class="leading-10 mb-4">
      <h1 class="font-bold text-3xl">{title}</h1>
      <div class="text-gray-500">Edited on {time}</div>
    </div>
  )
}
