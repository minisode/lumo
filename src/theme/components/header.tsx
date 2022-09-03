export default function Header({
  logo,
  paths
}: {
  logo: string
  paths: string[]
}) {
  return (
    <header>
      <div class="container mx-auto p-5">
        <div class="flex items-center justify-between h-10">
          <a href="/" class="font-bold text-2xl leading-10">
            {logo}
          </a>
          <nav>
            <ul class="flex items-center"></ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
