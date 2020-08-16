import React, { useState, useEffect } from "react";
import "./styles/App.css";

import Timer from "./components/Timer";
import StartButton from "./components/Start-Button";
import Form from "./components/Form";

const TEST_TIME = 60;

function App() {
  /* State:
  time: Time remaining on typing test
  wordsList: List of words user has to type
  wordsTyped: Number of words user has typed during test
  testActive: boolean condition stating whether test is currently in session
  testLoading: boolean condition stating whether API data is being fetched
  */

  const [time, setTime] = useState(0);
  const [wordsList, setWordsList] = useState(["test", "hello"]);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [testActive, setTestActive] = useState(false);
  const [testLoading, setTestLoading] = useState(false);

  function startTest() {
    setTestLoading(true);
    fetch("https://baconipsum.com/api/?type=meat?format=json")
      .then(response => response.json())
      .then(json => {
        let wordsListToSet = [];
        // Split string into list of words
        for (let sentence in json) {
          wordsListToSet.push(json[sentence].split(" "));
        }
        wordsListToSet = [].concat.apply([], wordsListToSet);
        /* Filter out items in array that are blank due to there being two
            spaces between period and start of new sentence */
        wordsListToSet = wordsListToSet.filter(word => {
          return word !== "";
        });
        setWordsList(wordsListToSet);
        setTime(TEST_TIME);
        setWordsTyped(0);
        setTestLoading(false);
      });
  }

  function incrementWordsTyped() {
    setWordsTyped(wordsTyped + 1);
  }

  // Logic for starting test timer
  useEffect(() => {
    let timeInterval = null;
    if (time > 0) {
      // Test in progress so decrement time by one second
      setTestActive(true);
      timeInterval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else {
      // Test complete so stop timer from counting down
      clearInterval(timeInterval);
      setTestActive(false);
    }
    return () => clearInterval(timeInterval);
  }, [time]);

  if (testActive) {
    return (
      <div className="App">
        <Timer time={time} />
        <Form
          wordsList={wordsList}
          wordsTyped={wordsTyped}
          incrementWordsTyped={incrementWordsTyped}
        />
      </div>
    );
  } else if (testLoading) {
    return (
      <div className="App">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1 className="header">Welcome to my typing speed app!</h1>
        <div className="header">Rules:</div>
        <ul className="header">
          <li>Type as many words as you can for 60 seconds</li>
          <li>No need to enter spaces between each word</li>
          <li>Punctuation and letter casing must match</li>
        </ul>
        <StartButton startTest={startTest} />
        <div className="header">
          Your current typing speed is {wordsTyped} WPM
        </div>
      </div>
    );
  }
}

export default App;
