export default async function List({ name }) {  
  console.log(`zzzname`, name)
  const list = (await import(`../lists/${name}.js`))?.words
  //   console.log(`zzzlist`, list)
  return <div>
    <h1>Wordsta list</h1>
    {Object.keys(list).map((word) => {
      return <div key={word}>
        <h2>{word}</h2>
        <p>{list[word].definition}</p>
      </div>
    })}
  </div>
}