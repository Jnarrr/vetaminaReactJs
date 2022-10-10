import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
const VetSignup = () => {

  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [phone, setPhone]=useState("");
  const [password, setPassword]=useState("");
  
  
  const history = useHistory();

  async function vetsignup(){
    let item={name,email,phone,password}
    console.warn(item)
    
    let result = await fetch("http://localhost:8000/api/vetregister",{
      method:'POST',
      body:JSON.stringify(item),
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json',
      }

    })
    result = await result.json()
    localStorage.setItem("user-info",JSON.stringify(result))
    history.push('/vetlogin');
  }

  return (
    <div className="container">
      <div className="content">
        <div className="heading-container">

          <div>
            <h1>
              'Vetamina'
            </h1>

            <h2>
              Pet Management and Appointment web and mobile system
            </h2>
          </div>
        </div>

        <h3>
          SIGN UP
        </h3 >
        <div className="col-sm-6 offset-sm-3">
          <h1>Register</h1>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="name"/>
          <br />
          <input type="text"  value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="email"/>
          <br />
          <input type="text"  value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="phone"/>
          <br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="password"/>
          <br />
          
          <button  onClick={vetsignup} className="btn btn-primary" >Sign Up</button>
        </div>
        

      </div>
    </div>
  );
};

export default VetSignup;