import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from '../Navbar';

function ViewVet() {

    const [loading, setLoading] = useState(true);
    const [veterinaries, setVeterinaries] = useState([]);

    useEffect(() => {

        axios.get(`/api/veterinaries`).then(res=>{
            if(res.status === 200)
            {
                setVeterinaries(res.data.veterinaries)
                setLoading(false);
            }
        });

    }, []);

    const deleteVet = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-vet/${id}`).then(res=>{
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
        var veterinaries_HTMLTABLE = "";
       
        veterinaries_HTMLTABLE = veterinaries.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.vet_name}</td>
                    <td>{item.vet_email}</td>
                    <td>{item.vet_phone_number}</td>
                    <td>
                        <Link to={`edit-vet/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteVet(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
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
                                <h4>Veterinaries Data
                                    <Link to={'add-vet'} className="btn btn-primary btn-sm float-end"> Add Vet</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {veterinaries_HTMLTABLE}
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

export default ViewVet;