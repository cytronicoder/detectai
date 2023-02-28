import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="App">
      <main className="App-main">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="Enter text to analyze"
            value={userInput}
            onChange={onUserChangedText}
          />

          <div className="prompt-buttons">
            <div className="analyze-button" onClick={null}>
              <div className="analyze">
                <p>Analyze</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
