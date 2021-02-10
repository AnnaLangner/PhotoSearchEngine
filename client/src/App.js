import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './Home'
import { Search } from './Search';
import { Container } from 'react-bootstrap'

class App extends React.Component {
 
  render() {
    return (       
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={Search} />
        </Switch>
      </BrowserRouter>             
    );
  }
};

export default App;