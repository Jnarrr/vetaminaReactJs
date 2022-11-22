import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditMedicalRecord(props) {
    const [error_list, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [medicalrecordInput, setMedicalRecord] = useState([]);
    const medicalRecordID = props.match.params.id;

    useEffect(() => {
        
        axios.get(`/api/edit-medicalrecord/${medicalRecordID}`).then( res => {

            if(res.data.status === 200)
            {
                setMedicalRecord(res.data.medical_records);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/appointment');
            }
        });

    }, [history, medicalRecordID]);

    const handleInput = (e) => {
        e.persist();
        setMedicalRecord({...medicalrecordInput, [e.target.name]: e.target.value })
    }

    const updateMedicalRecord = (e) => {
        e.preventDefault();
        
        const data = {
            Date:medicalrecordInput.Date,
            Weight:medicalrecordInput.Weight,
            Against_Manufacturer_LotNo:medicalrecordInput.Against_Manufacturer_LotNo,
        }

        axios.put(`/api/update-medicalrecord/${medicalRecordID}`, data).then(res=>{
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

    return (
        <>
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Medical Record
                                    <button className='btn btn-danger btn-sm float-end' onClick={() => history.goBack()}>Back</button>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateMedicalRecord} >
                                    <div className="form-group mb-3">
                                        <label>Date</label>
                                        <input type="text" name="Date" onChange={handleInput} value={medicalrecordInput.Date}  className="form-control" disabled/>
                                        <span className="text-danger">{error_list.Date}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Weight(kg)</label>
                                        <input type="number" name="Weight" onChange={handleInput} value={medicalrecordInput.Weight}  className="form-control" />
                                        <span className="text-danger">{error_list.Weight}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Against_Manufacturer_LotNo</label>
                                        <input type="text" name="Against_Manufacturer_LotNo" onChange={handleInput} value={medicalrecordInput.Against_Manufacturer_LotNo}  className="form-control" />
                                        <span className="text-danger">{error_list.Against_Manufacturer_LotNo}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Edit Record</button>
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

export default EditMedicalRecord;