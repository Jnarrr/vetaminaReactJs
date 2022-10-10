import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

function Vetlogin() {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  
  
  const history = useHistory();
    return (
        <div className="container">
        <div className="content">
          <div className="heading-container">
  
            <div>
              <h1>
                'Vetamina'
              </h1>
            </div>

          </div>

          <div className="col-sm-6 offset-sm-3">
            <h1>Login</h1>
            <input type="text"  value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="email"/>
            <br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="password"/>
            <br />
            
            <button className="btn btn-primary" >Login</button>
          </div>
          
  
        </div>
      </div>
    );
  }
  
export default Vetlogin;