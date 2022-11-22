import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function VetDashboard() {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [medicalrecords, setMedicalRecords] = useState([]);
    const [tablemedicalrecords, setTableMedicalRecords] = useState(null);
    const history = useHistory();
    let user = JSON.parse(localStorage.getItem('user-info'))

    function logout()
    {
        localStorage.clear();
        history.push("/welcome");
    }

    useEffect(() => {

        axios.get(`/api/products/${user.clinic_id}`).then(res=>{
            if(res.status === 200)
            {
                setProducts(res.data.products)
                setLoading(false);
            }
        });

        axios.get(`/api/ClinicAppointments/${user.clinic_id}`).then(res=>{
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

    }, [user.clinic_id]);

    const deleteProduct = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-product/${id}`).then(res=>{
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

    const deleteMedicalRecord = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-medicalrecord/${id}`).then(res=>{
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

    async function search(key) {
        console.warn(key)
        let result = await fetch("http://localhost:8000/api/search/"+key);
        console.log(result);
        result = await result.json();
        global.key = key;
    
        var medicalrecords_HTMLTABLE = result.map((item, index) => {
          return (
            <tr key={index}>
                <td>{item.pet_id}</td>
                <td>{item.Date}</td>
                <td>{item.Weight} kg</td>
                <td>{item.Against_Manufacturer_LotNo}</td>
                <td>{item.vet_name}</td>
                <td>
                    <Link to={`edit-medicalrecord/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                </td>
                <td>
                    <button type="button" onClick={(e) => deleteMedicalRecord(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
          );
        });
        setTableMedicalRecords(medicalrecords_HTMLTABLE)
    }


    if(loading)
    {
        return <h4>Loading Dashboard Data...</h4>
    }
    else
    {
        var product_HTMLTABLE = "";
       
        product_HTMLTABLE = products.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>{item.product_price}</td>
                    <td>{item.product_description}</td>
                    <td>
                        <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteProduct(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });

        var appointment_HTMLTABLE = "";
       
        appointment_HTMLTABLE = appointments.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.procedure}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.pet}</td>
                    <td>
                        <Link to={`edit-appointment/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteProduct(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });

    }

    return (
        <>
        <div>
            
            <div className="container">
                <h2>Hello {user.vet_name}</h2>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Products Data
                                    <Link to={'add-product'} className="btn btn-primary btn-sm float-end"> Add Product</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Description</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product_HTMLTABLE}
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
                                <h4>Appointments Data</h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Procedure</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Pet Name</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointment_HTMLTABLE}
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
                                <Link to={`add-medicalrecordVet`} className="btn btn-primary btn-sm float-end"> Add Medical Record </Link>
                                <div className="col-sm offset-sm">
                                    <input type='text' onChange={(e)=>search(e.target.value)} className="form-control" placeholder="Search Pet ID" />
                                </div>
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
                                        {tablemedicalrecords}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={logout} >Log Out</button>
            
        </div>
        </>
    );

}

export default VetDashboard;