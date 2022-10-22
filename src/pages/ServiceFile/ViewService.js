import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from '../Navbar';

function ViewService() {

    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);

    useEffect(() => {

        axios.get(`/api/services`).then(res=>{
            if(res.status === 200)
            {
                setServices(res.data.services)
                setLoading(false);
            }
        });

    }, []);

    const deleteService = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-service/${id}`).then(res=>{
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
        return <h4>Loading Service Data...</h4>
    }
    else
    {
        var service_HTMLTABLE = "";
       
        service_HTMLTABLE = services.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.service_name}</td>
                    <td>{item.service_price}</td>
                    <td>{item.service_description}</td>
                    <td>
                        <Link to={`edit-service/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteService(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
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
                                <h4>Services Data
                                    <Link to={'add-service'} className="btn btn-primary btn-sm float-end"> Add Service</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Description</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {service_HTMLTABLE}
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

export default ViewService;