import React, { useState, useEffect } from "react";

function Form({ wordsTyped, incrementWordsTyped, wordsList }) {
  /* Props:
  wordsList: List of words user has to type
  incrementWordsTyped: Function which increments wordsTyped by 1
  wordsTyped: Number of words user has typed during test

  State: 
  input: Input user has typed in
  wordToType: Current word user has to type to be counted towards wordsTyped
  wordsBefore: All words before the current word that has to be typed
  wordsAfter: All words after the current word that has to be typed
  */

  const [input, setInput] = useState("");
  const [wordToType, setWordToType] = useState(wordsList[wordsTyped]);
  const [wordsBefore, setWordsBefore] = useState("");
  const [wordsAfter, setWordsAfter] = useState("");

  useEffect(() => {
    if (input === wordToType) {
      console.log("Word typed correctly!");
      incrementWordsTyped();
      setInput("");
    }
  }, [input, wordToType, incrementWordsTyped]);

  useEffect(() => {
    // Input is cleared when typing test begins
    if (wordsTyped === 0) {
      setInput("");
    }
    // Set current word to type based on user's progress
    setWordToType(wordsList[wordsTyped]);
    /* Combine list of words before current word to type into one string. Same
    with all words after current word to type. */
    let wordsBefore = wordsList.slice(0, wordsTyped);
    wordsBefore = wordsBefore.join(" ");
    let wordsAfter = wordsList.slice(wordsTyped + 1);
    wordsAfter = wordsAfter.join(" ");
    setWordsBefore(wordsBefore);
    setWordsAfter(wordsAfter);
  }, [wordsTyped, wordsList]);

  return (
    <div className="Form">
      <h3 className="words-container">
        <span className="words-before">{wordsBefore}</span>{" "}
        <span className="word-to-type">{wordToType}</span>{" "}
        <span className="words-after">{wordsAfter}</span>
      </h3>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        ></input>
      </form>
    </div>
  );
}

export default Form;
