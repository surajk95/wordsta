import Word from './word'
import styles from './list.module.scss'

export default async function List({ name }) {  
  console.log(`zzzname`, name)
  const list = (await import(`../lists/${name}.js`))?.words
  //   console.log(`zzzlist`, list)
  return <div className={styles.list}>
    {/* {list.map((item) => {
      return <div key={item?.word}>
        <h2>{item?.word}</h2>
        <p>{item?.definition}</p>
      </div>
    })} */}
    <Word words={list} />
  </div>
}