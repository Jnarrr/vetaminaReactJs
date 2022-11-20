import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddClinic() {

    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registration_number, setRegistration_number] = useState('');
    const [owner_name, setOwner_name] = useState('');
    const [clinic_name, setClinic_name] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [permit, setPermit] = useState('');
    const [verified, setVerified] = useState('false');
   // const [error_list, setError_list] = useState([]);
    /*const [clinicInput, setClinic] = useState({
        username: '',
        password: '',
        registration_number: '',
        owner_name: '',
        clinic_name: '',
        phone_number: '',
        address: '',
        email: '',
        permit: '',
        verified: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setClinic({...clinicInput, [e.target.name]: e.target.value })
    }*/

    const saveClinic = (e) => {
        e.persist();
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('registration_number', registration_number);
        formData.append('owner_name', owner_name);
        formData.append('clinic_name', clinic_name);
        formData.append('phone_number', phone_number);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('permit', permit);
        formData.append('verified', verified);

        /*const data = {
            username,
            password,
            registration_number,
            owner_name,
            clinic_name,
            phone_number,
            address,
            email,
            permit,
            verified
        }*/

        axios.post(`/api/add-clinic`, formData).then(res => {
            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setUsername('');
                setPassword('');
                setRegistration_number('');
                setOwner_name('');
                setClinic_name('');
                setPhone_number(''); 
                setAddress('');
                setEmail('');
                setPermit('');
                setVerified('');
                //setError_list([]);
                /*setClinic({
                    username: '',
                    password: '',
                    registration_number: '',
                    owner_name: '',
                    clinic_name: '',
                    phone_number: '',
                    address: '',
                    email: '',
                    permit: '',
                    verified: '',
                    error_list: [],
                });*/
                history.push('/AdminTable');
            }
            else if (res.data.status === 422){
                alert('Error')
            }
            /*else if(res.data.status === 422)
            {
                setClinic({...clinicInput, error_list: res.data.validate_err });
            }*/
        });
    }

    return (
        <>
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Clinic 
                                    <button className='btn btn-danger btn-sm float-end' onClick={() => history.goBack()}>Back</button>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveClinic} >
                                    <div className="form-group mb-3">
                                        <label>Username</label>
                                        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.username}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.password}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Registration Number</label>
                                        <input type="text" name="registration_number" onChange={(e) => setRegistration_number(e.target.value)} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.registration_number}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Owner Name</label>
                                        <input type="text" name="owner_name" onChange={(e) => setOwner_name(e.target.value)} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.owner_name}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Clinic Name</label>
                                        <input type="text" name="clinic_name" onChange={(e) => setClinic_name(e.target.value)} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.clinic_name}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Phone Number</label>
                                        <input type="text" name="phone_number" onChange={(e) => setPhone_number(e.target.value)} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.phone_number}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Clinic Address</label>
                                        <input type="text" name="address" onChange={(e) => setAddress(e.target.value)} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.address}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Clinic Email</label>
                                        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.email}</span>*/}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Permit</label>
                                        <input type="file" name="permit" onChange={(e) => setPermit(e.target.files[0])} className="form-control" />
                                        {/*<span className="text-danger">{clinicInput.error_list.permit}</span>*/}
                                    </div>
                                    {/*<div className="form-group mb-3">
                                        <label>Verified</label>
                                        <input type="text" name="verified" onChange={(e) => setVerified(e.target.value)} className="form-control" />
                                        {<span className="text-danger">{clinicInput.error_list.verified}</span>}
                                    </div>*/}
                                    <div className="form-group mb-3">
                                        <label>Verified</label>
                                        <select type="text" id="verified" name="verified" onChange={(e) => setVerified(e.target.value)} className="form-control">
                                            <option value = "false">false</option>
                                            <option value = "true">true</option>
                                        </select>
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