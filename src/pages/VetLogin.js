import React , {useState}from 'react';
import {useHistory, Link} from 'react-router-dom';

const VetLogin = () =>
{
    const [vet_email, setEmail]=useState("");
    const [vet_password, setPassword]=useState("");
    const history = useHistory();

    async function login()
    {
        let item={vet_email,vet_password};
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
          history.push("/vetdashboard");
        }
    }
    return(
        <div>
            
            <div className="col-sm-6 offset-sm-3">
                <h1>Veterinary Login</h1>
                <p>Login to continue</p>
                <input type ="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} className="form-control"/><br/>
                <input type ="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}className="form-control"/><br/>

                <button onClick={login}className="btn btn-primary">Login</button>
                <p><Link to ="/welcome">Back</Link></p>
            </div>
            

        </div>
    )
}

export default VetLogin;