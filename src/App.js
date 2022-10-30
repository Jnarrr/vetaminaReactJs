import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
//Product CRUD
import ViewProduct from './pages/ProductFile/ViewProduct';
import AddProduct from './pages/ProductFile/AddProduct';
import EditProduct from './pages/ProductFile/EditProduct';
//Clinic CRUD
import ViewClinic from './pages/ClinicFile/ViewClinic';
import AddClinic from './pages/ClinicFile/AddClinic';
import EditClinic from './pages/ClinicFile/EditClinic';
//Service CRUD
import ViewService from './pages/ServiceFile/ViewService';
import AddService from './pages/ServiceFile/AddService';
import EditService from './pages/ServiceFile/EditService';
//Employee CRUD
import ViewEmployee from './pages/EmployeeFile/ViewEmployee';
import AddEmployee from './pages/EmployeeFile/AddEmployee';
import EditEmployee from './pages/EmployeeFile/EditEmployee';

import VetSignup from './pages/VetRegister';
import VetLogin from './pages/VetLogin';
import ViewAppointment from './pages/ViewAppointment';
import Welcome from './pages/Welcome';

import axios from 'axios';

import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminTable from './pages/AdminTable';
import ClinicLogin from './pages/ClinicLogin';
import ClinicRegister from './pages/ClinicRegister';
import ViewVet from './pages/VetFile/ViewVet';



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

            <Route path="/veterinaries" component={ViewVet} />

            <Route path="/employees" component={ViewEmployee} />
            <Route path="/add-employee" component={AddEmployee} />
            <Route path="/edit-employee/:id" component={EditEmployee} />

            <Route path="/products" component={ViewProduct} />
            <Route path="/add-product" component={AddProduct} />
            <Route path="/edit-product/:id" component={EditProduct} />

            <Route path="/services" component={ViewService} />
            <Route path="/add-service" component={AddService} />
            <Route path="/edit-service/:id" component={EditService} />

            <Route path="/AdminLogin" component={AdminLogin} />
            <Route path="/AdminTable" component={AdminTable} />
            {/*<Route path="/edit-table/:id" component={EditTable} />*/}

            <Route path="/VetRegister" component={VetSignup} />
            <Route path="/VetLogin" component={VetLogin} />

            <Route path="/ClinicLogin" component={ClinicLogin} />
            <Route path="/ClinicRegister" component={ClinicRegister} />
            <Route path="/Appointment" component={ViewAppointment} />

          </Switch>
        </Router>
    </div>
  );
}

export default App;