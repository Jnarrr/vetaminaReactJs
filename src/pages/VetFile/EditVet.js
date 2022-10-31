import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditVet(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [vetInput, setVet] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {
        
        const vet_id = props.match.params.id;
        axios.get(`/api/edit-vet/${vet_id}`).then( res => {

            if(res.data.status === 200)
            {
                setVet(res.data.vet);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/vets');
            }
        });

    }, [history, props.match.params.id]);

    const handleInput = (e) => {
        e.persist();
        setVet({...vetInput, [e.target.name]: e.target.value });
    }

    const updateVet = (e) => {
        e.preventDefault();
        
        const vet_id = props.match.params.id;
        // const data = vetInput;
        const data = {
            vet_name:vetInput.vet_name,
            vet_email:vetInput.vet_email,
            vet_phone_number:vetInput.vet_phone_number,
            vet_password:vetInput.vet_password,
        }

        axios.put(`/api/update-vet/${vet_id}`, data).then(res=>{
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
        return <h4>Loading Edit Vet Data...</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Vets 
                                    <Link to={'/vets'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateVet} >
                                    <div className="form-group mb-3">
                                        <label>Vet Name</label>
                                        <input type="text" name="vet_name" onChange={handleInput} value={vetInput.vet_name} className="form-control" />
                                        <span className="text-danger">{errorInput.vet_name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Vet Email</label>
                                        <input type="text" name="vet_email" onChange={handleInput} value={vetInput.vet_email}  className="form-control" />
                                        <span className="text-danger">{errorInput.vet_email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Vet Phone Number</label>
                                        <input type="text" name="vet_phone_number" onChange={handleInput} value={vetInput.vet_phone_number}  className="form-control" />
                                        <span className="text-danger">{errorInput.vet_phone_number}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Vet Password</label>
                                        <input type="text" name="vet_password" onChange={handleInput} value={vetInput.vet_password}  className="form-control" />
                                        <span className="text-danger">{errorInput.vet_password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Vet</button>
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

export default EditVet;