import './App.css';
import { useState } from 'react';
import { Grid } from './Components/Grid';

import fetchWordList from './Components/readWordlist';
function App() {
  const [userInput, setUserInput] = useState("");

  return (
    <div className="App">
      <h1 id="wordle-title">42 - Wordle</h1>
      <Grid />
    </div>
  );
}

export default App;
