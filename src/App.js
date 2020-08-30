import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';
import './style/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import Home from './pages/Home/home.component';
import Admin from './admin/Admin/admin.component';

function App() {

  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/admincontrol' component={Admin} />
      </Router>
    </div>
  );
}

export default App;
