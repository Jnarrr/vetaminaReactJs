import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from './pages/Navbar';

import ViewClinic from './pages/ViewClinic';
import AddClinic from './pages/AddClinic';
import EditClinic from './pages/EditClinic';

import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <div className="App">
        <Router>

          <Navbar />

          <Switch>

            <Route path="/clinics" component={ViewClinic} />
            <Route path="/add-clinics" component={AddClinic} />
            <Route path="/edit-clinic/:id" component={EditClinic} />

          </Switch>
        </Router>
    </div>
  );
}

export default App;