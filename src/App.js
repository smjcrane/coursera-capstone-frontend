import React from 'react';
import Login from "./inputs/Login";
import Centered from "./Centered"

function App() {
  return (
      <Centered>
          <h1>Welcome!<br />Log in to get started<br /></h1>
          <Login />
      </Centered>
  );
}

export default App;
