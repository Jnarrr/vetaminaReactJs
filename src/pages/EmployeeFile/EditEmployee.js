import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditEmployee(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [employeeInput, setEmployee] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {
        
        const employee_id = props.match.params.id;
        axios.get(`/api/edit-employee/${employee_id}`).then( res => {

            if(res.data.status === 200)
            {
                setEmployee(res.data.employee);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/dashboard');
            }
        });

    }, [history, props.match.params.id]);

    const handleInput = (e) => {
        e.persist();
        setEmployee({...employeeInput, [e.target.name]: e.target.value });
    }

    const updateEmployee = (e) => {
        e.preventDefault();
        
        const employee_id = props.match.params.id;
        // const data = employeeInput;
        const data = {
            employee_name:employeeInput.employee_name,
            employee_email:employeeInput.employee_email,
            employee_phone_number:employeeInput.employee_phone_number,
            employee_password:employeeInput.employee_password,
        }

        axios.put(`/api/update-employee/${employee_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/dashboard');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/dashboard');
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Edit Employee Data...</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Employees 
                                <button className='btn btn-danger btn-sm float-end' onClick={() => history.goBack()}>Back</button>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateEmployee} >
                                    <div className="form-group mb-3">
                                        <label>Employee Name</label>
                                        <input type="text" name="employee_name" onChange={handleInput} value={employeeInput.employee_name} className="form-control" />
                                        <span className="text-danger">{errorInput.employee_name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Email</label>
                                        <input type="text" name="employee_email" onChange={handleInput} value={employeeInput.employee_email}  className="form-control" />
                                        <span className="text-danger">{errorInput.employee_email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Phone Number</label>
                                        <input type="text" name="employee_phone_number" onChange={handleInput} value={employeeInput.employee_phone_number}  className="form-control" />
                                        <span className="text-danger">{errorInput.employee_phone_number}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Password</label>
                                        <input type="password" name="employee_password" onChange={handleInput} value={employeeInput.employee_password}  className="form-control" />
                                        <span className="text-danger">{errorInput.employee_password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Employee</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EditEmployee;