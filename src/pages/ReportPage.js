import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

function ReportPage() {
    const [allappointment, setAllAppointments] = useState([]);
    const [monthappointments, setMonthAppointments] = useState([]);
    const [allmedicalrecord, setAllMedicalRecords] = useState([]);
    const [monthmedicalrecords, setMonthMedicalRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user-info'));
        let clinicID = user.id;

        axios.get(`/api/appointmentServiceCount/${clinicID}`).then(res=>{
            if(res.status === 200)
            {
                setAllAppointments(res.data.allproceduresCount)
                setLoading(false);
            }
        });

        axios.get(`/api/appointmentCurrentMonthCount/${clinicID}`).then(res=>{
            if(res.status === 200)
            {
                setMonthAppointments(res.data.appointmentCurrentMonthCount)
                setLoading(false);
            }
        });

        axios.get(`/api/medicalReport/${clinicID}`).then(res=>{
            if(res.status === 200)
            {
                setAllMedicalRecords(res.data.allMedicalRecordsCount)
                setLoading(false);
            }
        });

        axios.get(`/api/medicalrecordCurrentMonthCount/${clinicID}`).then(res=>{
            if(res.status === 200)
            {
                setMonthMedicalRecords(res.data.medicalrecordCurrentMonthCount)
                setLoading(false);
            }
        });

    },[]);

    return (
        <>
        <Navbar />
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Total Appointments for this Month: {monthappointments}</h4>
                        </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Vaccine</th>
                                            <th>Grooming</th>
                                            <th>Surgery</th>
                                            <th>Checkup</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{allappointment[0]}</td>
                                            <td>{allappointment[1]}</td>
                                            <td>{allappointment[2]}</td>
                                            <td>{allappointment[3]}</td>
                                        </tr>
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
                            <h4>Total Medical Record for this Month: {monthmedicalrecords}</h4>
                        </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Parvo</th>
                                            <th>Parasite</th>
                                            <th>Rabies</th>
                                            <th>etc.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{allmedicalrecord[0]}</td>
                                            <td>{allmedicalrecord[1]}</td>
                                            <td>{allmedicalrecord[2]}</td>
                                            <td>{monthmedicalrecords - (allmedicalrecord[0] + allmedicalrecord[1] + allmedicalrecord[2])}</td>
                                        </tr>
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

export default ReportPage;