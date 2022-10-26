import React , {useState}from 'react';
import {useHistory, Link} from 'react-router-dom';

const VetLogin = () =>
{
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const history = useHistory();

    async function login()
    {
        let item={email,password};
        let result = await fetch("http://localhost:8000/api/vetlogin",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json',
            },
            body:JSON.stringify(item)

        });
        result = await result.json();
        localStorage.setItem("user-info",JSON.stringify(result));
        if("error" in result){
          alert("error message");
        }else{
          history.push("/dashboard");
        }
    }
    return(
        <div>
            
            <div className="col-sm-6 offset-sm-3">
                <h1>Login</h1>
                <p>Login to continue</p>
                <input type ="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} className="form-control"/><br/>
                <input type ="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}className="form-control"/><br/>

                <button onClick={login}className="btn btn-primary">Login</button>
                <p>Don't have account? <Link to ="/VetRegister">Register here</Link></p>
                <p><Link to ="/AdminLogin">Admin Login</Link></p>
            </div>
            

        </div>
    )
}

export default VetLogin;