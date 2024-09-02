import { lists } from "../config/lists"
import List from "../components/list"

interface PageProps {
  params: {
    slug: string,
  },
}

export default function Page({ params: { slug } }: PageProps ) {
  const slugFormatted = String(slug).replaceAll('%20', '-').toLowerCase()
  const list = lists.find((list) => list.slug === slugFormatted)

  return (
    <div>
      <h1>{list?.name}</h1>
      <List name={list?.slug} />
    </div>
  )
}