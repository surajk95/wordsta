// 1. Go to a vocabulary list page Ex: https://www.vocabulary.com/lists/8710638
// 2. Run this script to get the words
words = {}
container = document.querySelectorAll(".entry")
[...container].forEach(el => {
    words[el.getAttribute("word")] = {
        word: el.getAttribute("word"),
        freq: parseFloat(el.getAttribute("freq")),
        definition: el.querySelector(".definition").innerText
    }})