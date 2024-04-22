import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./components/main.component";

function App() {
  return (<Router>
    <div className="App">
          <Switch>
            <Route exact path='/' component={Main} />
          </Switch>
        
    </div></Router>
  );
}

export default App;
