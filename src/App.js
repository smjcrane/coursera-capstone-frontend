/* eslint-disable */
import React from 'react';
import Login from "./inputs/Login";
import Centered from "./Centered"
import Header from "./Header";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Inbox from "./Inbox";
import About from "./About";
import Footer from "./Footer"
import Privacy from "./Privacy";

function App() {
  return (
      <Router>
          <div>
          <Centered>
          <Header />
          <div className="content">
          <Switch>
              <Route path="/about">
                  <About />
              </Route>
              <Route path="/privacy">
                  <Privacy/>
              </Route>
              <Route path="/inbox">
                  <Inbox />
              </Route>
              <Route path="/index.html">
                  <div>
                      <h1>Welcome!<br />Log in to get started<br /></h1>
                      <Login />
                  </div>
              </Route>
              <Route path="/">
                  <Inbox />
              </Route>
          </Switch>
          </div>
              <Footer />
          </Centered>

          </div>
        </Router>
  );
}

export default App;
