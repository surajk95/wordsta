import Word from './word'
import styles from './list.module.scss'

export default async function List({ name }: { name: string | undefined }) {  

  const words = (await import(`../lists/${name}.js`))?.words

  return <div className={styles.list}>
    <Word words={words} name={name}/>
  </div>
}