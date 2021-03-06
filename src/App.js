import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';
import './style/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import Home from './pages/Home/home.component';
import Admin from './admin/Admin/admin.component';
import { getadmin } from './firebase/firebase.utiles';

class App extends Component {

  async componentDidMount() {
    let admin = await getadmin()
    document.title = admin[2].title

    var x = document.createElement("LINK");
    x.setAttribute("rel", "icon");
    x.setAttribute("href", admin[2].logo);
    // console.log(x)
    document.head.appendChild(x);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path='/' component={Home} />
          <Route path='/admincontrol' component={Admin} />
        </Router>
      </div>
    );
  }
}

export default App;
