import './App.css';
import { useState } from 'react';
import { Grid } from './Components/Grid';

function App() {
  const [userInput, setUserInput] = useState("");

  return (
    <div className="App">
      <Grid />
    </div>
  );
}

export default App;
