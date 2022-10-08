import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditClinic(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [clinicInput, setClinic] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {
        
        const clinic_id = props.match.params.id;
        axios.get(`/api/edit-clinic/${clinic_id}`).then( res => {

            if(res.data.status === 200)
            {
                setClinic(res.data.clinic);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/clinics');
            }
        });

    }, [history]);

    const handleInput = (e) => {
        e.persist();
        setClinic({...clinicInput, [e.target.name]: e.target.value });
    }

    const updateClinic = (e) => {
        e.preventDefault();
        
        const clinic_id = props.match.params.id;
        // const data = clinicInput;
        const data = {
            name: clinicInput.name,
            address: clinicInput.address,
            email: clinicInput.email,
            phone: clinicInput.phone,
            services: clinicInput.services,
        }

        axios.put(`/api/update-clinic/${clinic_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/clinics');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandetory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/clinics');
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Edit Clinic Data...</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Clinics 
                                    <Link to={'/clinics'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateClinic} >
                                    <div className="form-group mb-3">
                                        <label>Clinic Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={clinicInput.name} className="form-control" />
                                        <span className="text-danger">{errorInput.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Clinic address</label>
                                        <input type="text" name="address" onChange={handleInput} value={clinicInput.address}  className="form-control" />
                                        <span className="text-danger">{errorInput.address}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Clinic Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={clinicInput.email}  className="form-control" />
                                        <span className="text-danger">{errorInput.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Clinic Phone</label>
                                        <input type="text" name="phone" onChange={handleInput} value={clinicInput.phone}  className="form-control" />
                                        <span className="text-danger">{errorInput.phone}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Services</label>
                                        <input type="text" name="services" onChange={handleInput} value={clinicInput.services}  className="form-control" />
                                        <span className="text-danger">{errorInput.services}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Clinic</button>
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

export default EditClinic;