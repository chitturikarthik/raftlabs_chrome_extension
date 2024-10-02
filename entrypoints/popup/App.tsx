import React from 'react';
import './App.css';

const App = () => {
  const handleLogin = () => {
    chrome.runtime.sendMessage({ type: 'LOGIN' }, (response) => {
      if (response && response.success) {
        alert('Login successful!');
      } else {
        alert('Login failed!');
      }
    });
  };

  return (
    <div className="App">
      <h1>LinkedIn Connect</h1>
      <button onClick={handleLogin}>Login with LinkedIn</button>
    </div>
  );
};

export default App;
