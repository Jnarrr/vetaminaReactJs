import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import ViewProduct from './pages/ViewProduct';
import AddProduct from './pages/AddProduct';

import ViewClinic from './pages/ViewClinic';
import AddClinic from './pages/AddClinic';
import EditClinic from './pages/EditClinic';
import VetSignup from './pages/VetRegister';
import VetLogin from './pages/VetLogin';
import ViewAppointment from './pages/ViewAppointment';
import Welcome from './pages/Welcome';

import axios from 'axios';
import EditProduct from './pages/EditProduct';
import Dashboard from './pages/Dashboard';
import ViewService from './pages/ViewService';
import AddService from './pages/AddService';
import EditService from './pages/EditService';
import ViewEmployee from './pages/ViewEmployee';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';

axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <div className="App">
        <Router exact path="/">
          <Redirect to="/welcome" />
          <Switch>

            <Route path="/welcome" component={Welcome} />
            <Route path="/dashboard" component={Dashboard} />

            <Route path="/clinics" component={ViewClinic} />
            <Route path="/add-clinics" component={AddClinic} />
            <Route path="/edit-clinic/:id" component={EditClinic} />

            <Route path="/employees" component={ViewEmployee} />
            <Route path="/add-employee" component={AddEmployee} />
            <Route path="/edit-employee/:id" component={EditEmployee} />

            <Route path="/products" component={ViewProduct} />
            <Route path="/add-product" component={AddProduct} />
            <Route path="/edit-product/:id" component={EditProduct} />

            <Route path="/services" component={ViewService} />
            <Route path="/add-service" component={AddService} />
            <Route path="/edit-service/:id" component={EditService} />

            {/*<Route path="/AdminLogin" component={AdminLogin} />
            <Route path="/AdminTable" component={AdminTable} />
            <Route path="/edit-table/:id" component={EditTable} />*/}

            <Route path="/VetRegister" component={VetSignup} />
            <Route path="/VetLogin" component={VetLogin} />
            <Route path="/Appointment" component={ViewAppointment} />

          </Switch>
        </Router>
    </div>
  );
}

export default App;