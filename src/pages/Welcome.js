import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
    return (
      <div>
        <h1>Welcome</h1>
        <Link to="/ClinicLogin">Login</Link>
        <br></br>
        <Link to="/ClinicRegister">Register</Link>
        <br></br>
        <p><Link to ="/AdminLogin">Admin Login</Link></p>
      </div>
    );
  }
  
export default Welcome;