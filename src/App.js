import './App.css';
import { useState } from 'react';
import { Grid } from './components/Grid';

import fetchWordList from './components/readWordlist';
function App() {
  const [userInput, setUserInput] = useState("");

  return (
    <div className="App">
      <Grid />
    </div>
  );
}

export default App;
