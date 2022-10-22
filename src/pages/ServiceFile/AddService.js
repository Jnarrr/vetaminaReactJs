import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from '../Navbar';

function AddService() {

    const history = useHistory();
    const [serviceInput, setService] = useState({
        service_name: '',
        service_price: '',
        service_description: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setService({...serviceInput, [e.target.name]: e.target.value })
    }

    const saveService = (e) => {
        e.preventDefault();
        
        const data = {
            service_name:serviceInput.service_name,
            service_price:serviceInput.service_price,
            service_description:serviceInput.service_description,
        }

        axios.post(`/api/add-service`, data).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setService({
                    service_name: '',
                    service_price: '',
                    service_description: '',
                    error_list: [],
                });
                history.push('/services');
            }
            else if(res.data.status === 422)
            {
                setService({...serviceInput, error_list: res.data.validate_err });
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
                                <h4>Add Service 
                                    <Link to={'/services'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveService} >
                                    <div className="form-group mb-3">
                                        <label>Service Name</label>
                                        <input type="text" name="service_name" onChange={handleInput} value={serviceInput.service_name} className="form-control" />
                                        <span className="text-danger">{serviceInput.error_list.service_name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Service Price</label>
                                        <input type="text" name="service_price" onChange={handleInput} value={serviceInput.service_price}  className="form-control" />
                                        <span className="text-danger">{serviceInput.error_list.service_price}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Service Description</label>
                                        <input type="text" name="service_description" onChange={handleInput} value={serviceInput.service_description}  className="form-control" />
                                        <span className="text-danger">{serviceInput.error_list.service_description}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Service</button>
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

export default AddService;