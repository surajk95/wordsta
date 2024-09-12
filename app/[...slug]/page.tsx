import { lists } from "../config/lists"
import List from "../components/list"
import styles from "../components/list.module.scss"
import Controls from "../components/controls"
import { ProgressUI } from "../components/progress"

interface PageProps {
  params: {
    slug: string,
  },
}

export default function Page({ params: { slug } }: PageProps ) {
  const slugFormatted = String(slug).replaceAll('%20', '-').toLowerCase()
  const list = lists.find((list) => list.slug === slugFormatted)

  return (
    <div className={`flex flex-col items-center justify-center w-full max-w h-screen ${styles.listContainer}`}>
      <Controls />
      {/* <h1 className="text-2xl font-bold"><b>List:</b> {list?.name}</h1> */}
      <List name={list?.slug} />
      <ProgressUI />
    </div>
  )
}