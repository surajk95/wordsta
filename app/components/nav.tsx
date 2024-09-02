import Link from 'next/link'
import { lists } from '../config/lists'

export default function Nav() {
  return (
    <nav>
      <ul>
        {
          lists.map((list) => (
            <li key={list.id}>
              <Link href={`/${list.slug}`}>{list.name}</Link>
            </li>
          ))
        }
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  )
}