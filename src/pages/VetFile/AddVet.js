import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from '../Navbar';

function AddVet() {

    const history = useHistory();
    const [vetInput, setEmployee] = useState({
        vet_name: '',
        vet_email: '',
        vet_phone_number: '',
        vet_password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setEmployee({...vetInput, [e.target.name]: e.target.value })
    }

    const saveVeterinary = (e) => {
        e.preventDefault();
        
        const data = {
            vet_name:vetInput.vet_name,
            vet_email:vetInput.vet_email,
            vet_phone_number:vetInput.vet_phone_number,
            vet_password:vetInput.vet_password,
        }

        axios.post(`/api/add-vet`, data).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setEmployee({
                    vet_name: '',
                    vet_email: '',
                    vet_phone_number: '',
                    vet_password: '',
                    error_list: [],
                });
                history.push('/dashboard');
            }
            else if(res.data.status === 422)
            {
                setEmployee({...vetInput, error_list: res.data.validate_err });
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
                                <h4>Add Veterinary 
                                    <Link to={'/veterinaries'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveVeterinary} >
                                    <div className="form-group mb-3">
                                        <label>Veterinary Name</label>
                                        <input type="text" name="vet_name" onChange={handleInput} value={vetInput.vet_name} className="form-control" />
                                        <span className="text-danger">{vetInput.error_list.vet_name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Veterinary Email</label>
                                        <input type="text" name="vet_email" onChange={handleInput} value={vetInput.vet_email}  className="form-control" />
                                        <span className="text-danger">{vetInput.error_list.vet_email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Veterinary Phone Number</label>
                                        <input type="text" name="vet_phone_number" onChange={handleInput} value={vetInput.vet_phone_number}  className="form-control" />
                                        <span className="text-danger">{vetInput.error_list.vet_phone_number}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Veterinary Password</label>
                                        <input type="password" name="vet_password" onChange={handleInput} value={vetInput.vet_password}  className="form-control" />
                                        <span className="text-danger">{vetInput.error_list.vet_password}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Veterinary</button>
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

export default AddVet;