/* eslint-disable */
import React from 'react';
import Login from "./inputs/Login";
import Centered from "./Centered"
import Header from "./Header";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Inbox from "./pages/Inbox";
import About from "./pages/About";
import Footer from "./Footer"
import Privacy from "./pages/Privacy";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetWithCode from "./pages/ResetWithCode";
import DbDump from "./pages/dbDump";
import Settings from "./pages/Settings";

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
              <Route path="/register">
                  <>
                  <h1>Register for an account</h1>
                  <SignUp />
                  </>
              </Route>
              <Route path="/forgot">
                  <ForgotPassword />
              </Route>
              <Route path="/entercode">
                  <ResetWithCode />
              </Route>
              <Route path="/inbox">
                  <Inbox />
              </Route>
              <Route path="/index.html">
                  <>
                      <h1>Welcome!<br />Log in to get started<br /></h1>
                      <Login />
                  </>
              </Route>
              <Route path="/dbdump">
                  <DbDump />
              </Route>
              <Route path="/settings">
                  <Settings />
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
