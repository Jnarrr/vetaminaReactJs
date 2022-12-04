import React , {useState}from 'react';
import {useHistory, Link} from 'react-router-dom';

const ClinicLogin = () =>
{
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const history = useHistory();

    async function login()
    {
        let item={username,password};
        let result = await fetch("http://localhost:8000/api/cliniclogin",{
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
            alert("Username or Password is not matched");
        }else if ("notVerified" in result){
            alert("User is not yet Verified");
        }
        else{
            global.id = result.id;
            global.owner_name = result.owner_name;
            history.push("/dashboard");
        }
    }
    return(
        <div>
            
            <div className="col-sm-6 offset-sm-3">
                <h1>Clinic Login</h1>
                <p>Login to continue</p>
                <input type ="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} className="form-control"/><br/>
                <input type ="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}className="form-control"/><br/>

                <button onClick={login}className="btn btn-primary">Login</button>
                <p>Don't have account? <Link to ="/ClinicRegister">Register here</Link></p>
                <p><Link to ="/welcome">Back</Link></p>
            </div>
            

        </div>
    )
}

export default ClinicLogin;