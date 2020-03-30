import React from 'react';
import './App.css';
import './inputs/Username';
import './inputs/Password';
import Username from "./inputs/Username";
import Password from "./inputs/Password";

function App() {
  return (
    <div className="App">
      <Username/> <br />
      <Password/>
    </div>
  );
}

export default App;
