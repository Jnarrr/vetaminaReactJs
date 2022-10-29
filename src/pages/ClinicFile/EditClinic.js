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

    }, [history, props.match.params.id]);

    const handleInput = (e) => {
        e.persist();
        setClinic({...clinicInput, [e.target.name]: e.target.value });
    }

    const updateClinic = (e) => {
        e.preventDefault();
        
        const clinic_id = props.match.params.id;
        // const data = clinicInput;
        const data = {
            username: clinicInput.username,
            password: clinicInput.password,
            registration_number: clinicInput.registration_number,
            owner_name: clinicInput.owner_name,
            clinic_name: clinicInput.clinic_name,
            phone_number: clinicInput.phone_number,
            address: clinicInput.address,
            email: clinicInput.email,
            permit: clinicInput.permit,
            verified: clinicInput.verified
        }

        axios.put(`/api/update-clinic/${clinic_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/AdminTable');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory","","error");
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
                                        <label>Username</label>
                                        <input type="text" name="username" onChange={handleInput} value={clinicInput.username} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.username}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={clinicInput.password} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.password}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Registration Number</label>
                                        <input type="text" name="registration_number" onChange={handleInput} value={clinicInput.registration_number} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.registration_number}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Owner Name</label>
                                        <input type="text" name="owner_name" onChange={handleInput} value={clinicInput.owner_name} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.owner_name}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Clinic Name</label>
                                        <input type="text" name="clinic_name" onChange={handleInput} value={clinicInput.clinic_name} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.clinic_name}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Phone Number</label>
                                        <input type="text" name="phone_number" onChange={handleInput} value={clinicInput.phone_number} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.phone_number}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Clinic Address</label>
                                        <input type="text" name="address" onChange={handleInput} value={clinicInput.address} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.address}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Clinic Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={clinicInput.email} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.email}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Permit</label> <br/>
                                        <img src={ "http://localhost:8000/" + clinicInput.permit } className="img-fluid img-bordered" width="200px" alt='alternative'/>
                                        {/*<span className="text-danger">{clinicInput.error_list.permit}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Verified</label>
                                        <select type="text" id="verified" name="verified" onChange={handleInput} value={clinicInput.verified} className="form-control">
                                            <option value = "false">false</option>
                                            <option value = "true">true</option>
                                        </select>
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