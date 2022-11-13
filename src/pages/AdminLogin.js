import React , {useState}from 'react';
import {useHistory, Link} from 'react-router-dom';

const AdminLogin = () =>
{
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const history = useHistory();

    function login()
    {
        if((username !== 'admin') || (password !== 'adminpassword')){
          alert("Username or Password is not matched");
        }else{
          history.push("/AdminTable");
        }
    }
    return(
        <div>
            
            <div className="col-sm-6 offset-sm-3">
                <h1>Admin Login</h1>
                <p>Login to continue</p>
                <input type ="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} className="form-control"/><br/>
                <input type ="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}className="form-control"/><br/>

                <button onClick={login}className="btn btn-primary">Login</button>
                <p><Link to ="/welcome">Back</Link></p>
            </div>
            

        </div>
    )
}

export default AdminLogin;