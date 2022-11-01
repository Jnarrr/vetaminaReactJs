import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
    return (
      <div>
        <h1>Welcome</h1>
        <Link to="/ClinicLogin">Clinic Login</Link>
        <br></br>
        <Link to ="/AdminLogin">Admin Login</Link>
        <br></br>
        <Link to ="/EmployeeLogin">Employee Login</Link>
      </div>
    );
  }
  
export default Welcome;