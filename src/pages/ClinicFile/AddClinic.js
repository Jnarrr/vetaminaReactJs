import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from '../Navbar';

function AddClinic() {

    const history = useHistory();
    const [clinicInput, setClinic] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        services: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setClinic({...clinicInput, [e.target.name]: e.target.value })
    }

    const saveClinic = (e) => {
        e.preventDefault();
        
        const data = {
            name:clinicInput.name,
            address:clinicInput.address,
            email:clinicInput.email,
            phone:clinicInput.phone,
            services:clinicInput.services,
        }

        axios.post(`/api/add-clinic`, data).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setClinic({
                    name: '',
                    address: '',
                    email: '',
                    phone: '',
                    services: '',
                    error_list: [],
                });
                history.push('/clinics');
            }
            else if(res.data.status === 422)
            {
                setClinic({...clinicInput, error_list: res.data.validate_err });
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
                                <h4>Add Clinic 
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveClinic} >
                                    <div className="form-group mb-3">
                                        <label>Clinic Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={clinicInput.name} className="form-control" />
                                        <span className="text-danger">{clinicInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Clinic address</label>
                                        <input type="text" name="address" onChange={handleInput} value={clinicInput.address}  className="form-control" />
                                        <span className="text-danger">{clinicInput.error_list.address}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Clinic Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={clinicInput.email}  className="form-control" />
                                        <span className="text-danger">{clinicInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Clinic Phone</label>
                                        <input type="text" name="phone" onChange={handleInput} value={clinicInput.phone}  className="form-control" />
                                        <span className="text-danger">{clinicInput.error_list.phone}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Services</label>
                                        <input type="text" name="services" onChange={handleInput} value={clinicInput.services}  className="form-control" />
                                        <span className="text-danger">{clinicInput.error_list.services}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Clinic</button>
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

export default AddClinic;