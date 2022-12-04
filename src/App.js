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
import AddVet from './pages/VetFile/AddVet';
import EditVet from './pages/VetFile/EditVet';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeDashboard from './pages/EmployeeDashboard';
import VetDashboard from './pages/VetDashboard';
import EditAppointment from './pages/EditAppointment';
import AddMedicalRecord from './pages/AddMedicalRecord';
import EditMedicalRecord from './pages/EditMedicalRecord';
import AddMedicalRecordVet from './pages/AddMedicalRecordVet';
import ReportPage from './pages/ReportPage';



axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <div className="App">
        <Router exact path="/">
          <Redirect to="/welcome" />
          <Switch>

            <Route path="/welcome" component={Welcome} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/employeedashboard" component={EmployeeDashboard} />

            <Route path="/clinics" component={ViewClinic} />
            <Route path="/add-clinics" component={AddClinic} />
            <Route path="/edit-clinic/:id" component={EditClinic} />

            <Route path="/veterinaries" component={ViewVet} />
            <Route path="/add-vet" component={AddVet} />
            <Route path="/edit-vet/:id" component={EditVet} />

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

            <Route path="/VetLogin" component={VetLogin} />
            <Route path="/vetdashboard" component={VetDashboard} />

            <Route path="/EmployeeLogin" component={EmployeeLogin} />
            <Route path="/ClinicLogin" component={ClinicLogin} />
            <Route path="/ClinicRegister" component={ClinicRegister} />
            <Route path="/appointment" component={ViewAppointment} />
            <Route path="/add-medicalrecord" component={AddMedicalRecord} />
            <Route path="/add-medicalrecordVet" component={AddMedicalRecordVet} />
            <Route path="/edit-medicalrecord/:id" component={EditMedicalRecord} />
            <Route path="/edit-appointment/:id" component={EditAppointment} />

            <Route path="/report" component={ReportPage} />

          </Switch>
        </Router>
    </div>
  );
}

export default App;