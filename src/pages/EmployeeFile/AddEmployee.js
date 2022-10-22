import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from '../Navbar';

function AddEmployee() {

    const history = useHistory();
    const [employeeInput, setEmployee] = useState({
        employee_name: '',
        employee_email: '',
        employee_phone_number: '',
        employee_password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setEmployee({...employeeInput, [e.target.name]: e.target.value })
    }

    const saveEmployee = (e) => {
        e.preventDefault();
        
        const data = {
            employee_name:employeeInput.employee_name,
            employee_email:employeeInput.employee_email,
            employee_phone_number:employeeInput.employee_phone_number,
            employee_password:employeeInput.employee_password,
        }

        axios.post(`/api/add-employee`, data).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setEmployee({
                    employee_name: '',
                    employee_email: '',
                    employee_phone_number: '',
                    employee_password: '',
                    error_list: [],
                });
                history.push('/employees');
            }
            else if(res.data.status === 422)
            {
                setEmployee({...employeeInput, error_list: res.data.validate_err });
            }
        });
    }

    return (
        <>
        <Navbar />
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Employee 
                                    <Link to={'/employees'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveEmployee} >
                                    <div className="form-group mb-3">
                                        <label>Employee Name</label>
                                        <input type="text" name="employee_name" onChange={handleInput} value={employeeInput.employee_name} className="form-control" />
                                        <span className="text-danger">{employeeInput.error_list.employee_name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Email</label>
                                        <input type="text" name="employee_email" onChange={handleInput} value={employeeInput.employee_email}  className="form-control" />
                                        <span className="text-danger">{employeeInput.error_list.employee_email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Phone Number</label>
                                        <input type="text" name="employee_phone_number" onChange={handleInput} value={employeeInput.employee_phone_number}  className="form-control" />
                                        <span className="text-danger">{employeeInput.error_list.employee_phone_number}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Password</label>
                                        <input type="password" name="employee_password" onChange={handleInput} value={employeeInput.employee_password}  className="form-control" />
                                        <span className="text-danger">{employeeInput.error_list.employee_password}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Employee</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );

}

export default AddEmployee;