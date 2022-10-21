import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

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

axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>

            <Route path="/welcome" component={Welcome} />

            <Route path="/clinics" component={ViewClinic} />
            <Route path="/add-clinics" component={AddClinic} />
            <Route path="/edit-clinic/:id" component={EditClinic} />

            <Route path="/products" component={ViewProduct} />
            <Route path="/add-product" component={AddProduct} />
            <Route path="/edit-product/:id" component={EditProduct} />

            <Route path="/VetRegister" component={VetSignup} />
            <Route path="/VetLogin" component={VetLogin} />
            <Route path="/Appointment" component={ViewAppointment} />

          </Switch>
        </Router>
    </div>
  );
}

export default App;