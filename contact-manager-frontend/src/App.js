import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/home';
import Dashboard from './components/dashboard';
import { PrivateRoute } from './components/privateRoute';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
