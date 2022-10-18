import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from './pages/Navbar';

import ViewClinic from './pages/ViewClinic';
import AddClinic from './pages/AddClinic';
import EditClinic from './pages/EditClinic';
import VetSignup from './pages/VetRegister';
import VetLogin from './pages/VetLogin';
import ViewAppointment from './pages/ViewAppointment';

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
            <Route path="/VetRegister" component={VetSignup} />
            <Route path="/VetLogin" component={VetLogin} />
            <Route path="/Appointment" component={ViewAppointment} />

          </Switch>
        </Router>
    </div>
  );
}

export default App;