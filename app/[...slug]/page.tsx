import { lists } from "../config/lists"
import List from "../components/list"
import styles from "../components/list.module.scss"
import { ProgressUI } from "../components/progress"
import Info from "../components/info"

interface PageProps {
  params: {
    slug: string,
  },
}

export default function Page({ params: { slug } }: PageProps) {
  const slugFormatted = String(slug).replaceAll('%20', '-').toLowerCase()
  const list = lists.find((list) => list.slug === slugFormatted)

  return (
    <div className={`flex flex-col items-center justify-center w-full max-w ${styles.listContainer}`}>
      <List name={list?.slug} />
      <ProgressUI />
      <Info />
    </div>
  )
}