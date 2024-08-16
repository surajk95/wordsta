import { lists } from "../config/lists"
import List from "../components/list"

export default function Page(props) {
  const slug = String(props.params?.slug).replace('%20', '-').toLowerCase()
  const list = lists.find((list) => list.slug === slug)
  console.log(`zzzlist`, list, lists)
  return (
    <div>
      <h1>{list?.name}</h1>
      <List name={list?.slug} />
    </div>
  )
}