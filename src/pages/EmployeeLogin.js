import React , {useState}from 'react';
import {useHistory, Link} from 'react-router-dom';

const EmployeeLogin = () =>
{
    const [employee_email, setEmail]=useState("");
    const [employee_password, setPassword]=useState("");
    const history = useHistory();

    async function login()
    {
        let item={employee_email,employee_password};
        let result = await fetch("http://localhost:8000/api/employeelogin",{
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
        }
        else{
            history.push("/employeedashboard");
        }
    }
    return(
        <div>
            
            <div className="col-sm-6 offset-sm-3">
                <h1>Employee Login</h1>
                <p>Login to continue</p>
                <input type ="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="form-control"/><br/>
                <input type ="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}className="form-control"/><br/>

                <button onClick={login}className="btn btn-primary">Login</button>
                <p><Link to ="/welcome">Back</Link></p>
            </div>
            

        </div>
    )
}

export default EmployeeLogin;