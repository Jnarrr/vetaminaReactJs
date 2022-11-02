import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditService(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [serviceInput, setService] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {
        
        const service_id = props.match.params.id;
        axios.get(`/api/edit-service/${service_id}`).then( res => {

            if(res.data.status === 200)
            {
                setService(res.data.service);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/services');
            }
        });

    }, [history, props.match.params.id]);

    const handleInput = (e) => {
        e.persist();
        setService({...serviceInput, [e.target.name]: e.target.value });
    }

    const updateService = (e) => {
        e.preventDefault();
        
        const service_id = props.match.params.id;
        // const data = serviceInput;
        const data = {
            service_name:serviceInput.service_name,
            service_price:serviceInput.service_price,
            service_description:serviceInput.service_description,
        }

        axios.put(`/api/update-service/${service_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history.goBack()
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.goBack()
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Edit Service Data...</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Services 
                                    <Link to={'/services'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateService} >
                                    <div className="form-group mb-3">
                                        <label>Service Name</label>
                                        <input type="text" name="service_name" onChange={handleInput} value={serviceInput.service_name} className="form-control" />
                                        <span className="text-danger">{errorInput.service_name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Service Price</label>
                                        <input type="text" name="service_price" onChange={handleInput} value={serviceInput.service_price}  className="form-control" />
                                        <span className="text-danger">{errorInput.service_price}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Service Description</label>
                                        <input type="text" name="service_description" onChange={handleInput} value={serviceInput.service_description}  className="form-control" />
                                        <span className="text-danger">{errorInput.service_description}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Service</button>
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

export default EditService;