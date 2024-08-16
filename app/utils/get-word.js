// store words network response as a global variable, then run this
temp1.map(i => ({
  word: i.word,
  difficulty: i.difficulty,
  frequency: Math.floor(i.frequency*10000),
  definition: i.sense.definition,
  example: i.example.text,
  language: i.lang,
}))