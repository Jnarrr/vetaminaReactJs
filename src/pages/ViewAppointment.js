import React, {useState, useEffect, Component} from 'react';
import {Link, useHistory} from 'react-router-dom';

import axios from 'axios';

class ViewAppointment extends Component
{
    
    state = {
        appointments: [],
        loading: true,
    }
    
    async componentDidMount(){
        let user = JSON.parse(localStorage.getItem('user-info'));
        const res = await axios.get(`http://localhost:8000/api/ClinicAppointments/${user.id}`);
        
        if (res.data.status === 200)
        {
            this.setState({
                appointments: res.data.appointments,
                loading: false,
            });
        }
    }

    render(){

        var appointments_table = "";
        if (this.state.loading)
        {
            appointments_table = <tr><td colSpan="6"> <h2>Loading...</h2> </td></tr>;
        }
        else 
        {
            appointments_table = 
            this.state.appointments.map( (item) => {
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.procedure}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.pet}</td>
                    </tr>
                );
            } )
        }

        return(
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
                                        {appointments_table}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default ViewAppointment;