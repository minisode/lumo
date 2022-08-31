type FooterProps = {
  author: string
}

export default function Footer({ author }: FooterProps) {
  return (
    <footer>
      <div class="container mx-auto p-5">
        <div class="text-center leading-10 truncate">© 2022 {author}</div>
      </div>
    </footer>
  )
}
