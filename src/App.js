import React, { Component } from 'react';
import './App.css';
import FrontendLayout from './components/hocs/FrontendLayout';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import DashboardPage from './components/DashboardPage/DashboardPage';
import FavoritesPage from './components/FavoritesPage/FavoritesPage';
import HotelPage from './components/HotelPage/HotelPage';

class App extends Component {
    render(){
      return (
        <Router>
              <Switch> 
                <Route exact path="/dashboard" component={FrontendLayout(DashboardPage)} />
                <Route exact path="/favorites" component={FrontendLayout(FavoritesPage)} />
                <Route exact path="/hotel" component={FrontendLayout(HotelPage)} />
                <Route exact path="/" component={FrontendLayout(LoginPage)} />
              </Switch>
          </Router>
      );
    }
}

export default App;
