import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditAppointment(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [appointmentInput, setAppointment] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {
        
        const appointment_id = props.match.params.id;
        axios.get(`/api/edit-appointment/${appointment_id}`).then( res => {

            if(res.data.status === 200)
            {
                setAppointment(res.data.appointment);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/appointment');
            }
        });

    }, [history, props.match.params.id]);

    const handleInput = (e) => {
        e.persist();
        setAppointment({...appointmentInput, [e.target.name]: e.target.value });
    }

    const updateAppointment = (e) => {
        e.preventDefault();
        
        const appointment_id = props.match.params.id;
        // const data = appointmentInput;
        const data = {
            status:appointmentInput.status,
        }

        axios.put(`/api/update-appointment/${appointment_id}`, data).then(res=>{
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
        return <h4>Loading Edit Appointment Data...</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Appointments 
                                    <button className='btn btn-danger btn-sm float-end' onClick={() => history.goBack()}>Back</button>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateAppointment} >
                                    <div className="form-group mb-3">
                                        <label>Appointment Status</label>
                                        <select type="text" id="status" name="status" onChange={handleInput} value={appointmentInput.status} className="form-control">
                                            <option value = {appointmentInput.status} disabled>{appointmentInput.status}</option>
                                            <option value = "Approved">Approved</option>
                                            <option value = "Declined">Declined</option>
                                        </select>
                                        <span className="text-danger">{errorInput.status}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Appointment</button>
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

export default EditAppointment;