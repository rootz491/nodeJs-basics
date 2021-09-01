import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import Notes from "./Components/Notes";
import Post from "./Components/Post";

function App() {
  return (
    <Router>
      <Nav />
      <div className="App" style={{padding: "0 2em"}}>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/about' component={About} exact /> 
          <Route path='/notes' component={Notes} exact />
          <Route path='/post' component={Post} exact />
          <Route path='/note/:id' component={About} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
