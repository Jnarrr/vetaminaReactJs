import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddMedicalRecordVet() {

    let pet_id = global.key;
    let user = JSON.parse(localStorage.getItem('user-info'))
    let veterinary = user.vet_name;
    let clinic_id = user.clinic_id;
    
    const history = useHistory();
    const [medicalrecordInput, setMedicalRecord] = useState({
        pet_id: pet_id,
        clinic_id: clinic_id, 
        Date: '',
        Weight: '',
        Against_Manufacturer_LotNo: '',
        vet_name: veterinary,
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setMedicalRecord({...medicalrecordInput, [e.target.name]: e.target.value })
    }

    const saveMedicalRecord = (e) => {
        e.preventDefault();
        
        const data = {
            pet_id:medicalrecordInput.pet_id,
            clinic_id:medicalrecordInput.clinic_id,
            Date:medicalrecordInput.Date,
            Weight:medicalrecordInput.Weight,
            Against_Manufacturer_LotNo:medicalrecordInput.Against_Manufacturer_LotNo,
            vet_name:medicalrecordInput.vet_name,
        }

        axios.post(`/api/add-medicalrecord`, data).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setMedicalRecord({
                    pet_id: '',
                    clinic_id: '',
                    Date: '',
                    Weight: '',
                    Against_Manufacturer_LotNo: '',
                    vet_name: '',
                    error_list: [],
                });
                history.push('/appointment');
            }
            else if(res.data.status === 422)
            {
                setMedicalRecord({...medicalrecordInput, error_list: res.data.validate_err });
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
                                <h4>Add Medical Record
                                    <button className='btn btn-danger btn-sm float-end' onClick={() => history.goBack()}>Back</button>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveMedicalRecord} >
                                    <div className="form-group mb-3">
                                        <label>Pet ID</label>
                                        <input type="text" name="pet_id" onChange={handleInput} value={medicalrecordInput.pet_id} className="form-control" disabled/>
                                        <span className="text-danger">{medicalrecordInput.error_list.pet_id}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Date</label>
                                        <input type="date" name="Date" onChange={handleInput} value={medicalrecordInput.Date}  className="form-control" />
                                        <span className="text-danger">{medicalrecordInput.error_list.Date}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Weight(kg)</label>
                                        <input type="number" name="Weight" onChange={handleInput} value={medicalrecordInput.Weight}  className="form-control" />
                                        <span className="text-danger">{medicalrecordInput.error_list.Weight}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Against_Manufacturer_LotNo</label>
                                        <input type="text" name="Against_Manufacturer_LotNo" onChange={handleInput} value={medicalrecordInput.Against_Manufacturer_LotNo}  className="form-control" />
                                        <span className="text-danger">{medicalrecordInput.error_list.Against_Manufacturer_LotNo}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Vet Name</label>
                                        <input type="text" name="vet_name" onChange={handleInput} value={medicalrecordInput.vet_name}  className="form-control" disabled/>
                                        <span className="text-danger">{medicalrecordInput.error_list.vet_name}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Add Record</button>
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

export default AddMedicalRecordVet;