import Link from 'next/link'
import { lists } from '../config/lists'

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>About</li>
        <li>Contact</li>
        {
          lists.map((list) => (
            <li key={list.id}>
              <Link href={`/${list.name}`}>{list.name}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}