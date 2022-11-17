import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from './Navbar';

function ViewAppointment() {

    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [medicalrecords, setMedicalRecords] = useState([]);

    useEffect(() => {

        let user = JSON.parse(localStorage.getItem('user-info'));
        axios.get(`/api/ClinicAppointments/${user.id}`).then(res=>{
            if(res.status === 200)
            {
                setAppointments(res.data.appointments)
                setLoading(false);
            }
        });

        axios.get(`/api/medicalrecordAll`).then(res=>{
            if(res.status === 200)
            {
                setMedicalRecords(res.data.medical_records)
                setLoading(false);
            }
        });
    }, []);

    const deleteAppointment = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-appointment/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Deleted!",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Vet Data...</h4>
    }
    else
    {
        var appointments_HTMLTABLE = "";
       
        appointments_HTMLTABLE = appointments.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.procedure}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.pet}</td>
                    <td>
                        <Link to={`edit-appointment/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteAppointment(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });

        var medicalrecords_HTMLTABLE = "";
       
        medicalrecords_HTMLTABLE = medicalrecords.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.pet_id}</td>
                    <td>{item.Date}</td>
                    <td>{item.Weight}</td>
                    <td>{item.Against_Manufacturer_LotNo}</td>
                    <td>{item.vet_name}</td>
                </tr>
            );
        });

    }

    return (
        <>
        <Navbar />
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Appointments</h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Procedures</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Pet</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Medical Records
                                <Link to={`add-medicalrecord`} className="btn btn-primary btn-sm float-end"> Add Medical Record </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Pet_ID</th>
                                            <th>Date</th>
                                            <th>Weight</th>
                                            <th>Against_Manufacturer_LotNo</th>
                                            <th>Vet Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {medicalrecords_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    );

}

export default ViewAppointment;