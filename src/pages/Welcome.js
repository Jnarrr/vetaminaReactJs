import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
    return (
      <div>
        <h1>Welcome</h1>
        <Link to="/VetLogin">Login</Link>
        <br></br>
        <Link to="/VetRegister">Register</Link>
      </div>
    );
  }
  
export default Welcome;