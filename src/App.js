import React from 'react';
import Login from "./inputs/Login";
import Centered from "./Centered"
import Header from "./Header";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  return (
      <Router>
          <Centered>
          <Header />
          <Switch>
              <Route path="/about">
              </Route>
              <Route path="/">
                  <div>
                      <h1>Welcome!<br />Log in to get started<br /></h1>
                      <Login />
                  </div>
              </Route>
          </Switch>
        </Centered>
        </Router>
  );
}

export default App;
