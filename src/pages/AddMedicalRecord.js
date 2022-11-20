import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddMedicalRecord() {
    
    
    const history = useHistory();
    const [medicalrecordInput, setMedicalRecord] = useState({
        pet_id: '',
        product_name: '',
        product_price: '',
        product_description: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setMedicalRecord({...medicalrecordInput, [e.target.name]: e.target.value })
    }

    const saveMedicalRecord = (e) => {
        e.preventDefault();
        
        const data = {
            clinic_id:medicalrecordInput.clinic_id,
            product_name:medicalrecordInput.product_name,
            product_price:medicalrecordInput.product_price,
            product_description:medicalrecordInput.product_description,
        }

        axios.post(`/api/add-medicalrecord`, data).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setMedicalRecord({
                    clinic_id: '',
                    product_name: '',
                    product_price: '',
                    product_description: '',
                    error_list: [],
                });
                history.push('/dashboard');
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
                                <h4>Add Product 
                                    <button className='btn btn-danger btn-sm float-end' onClick={() => history.goBack()}>Back</button>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveMedicalRecord} >
                                    <div className="form-group mb-3">
                                        <label>Product Name</label>
                                        <input type="text" name="product_name" onChange={handleInput} value={medicalrecordInput.product_name} className="form-control" />
                                        <span className="text-danger">{medicalrecordInput.error_list.product_name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Price</label>
                                        <input type="text" name="product_price" onChange={handleInput} value={medicalrecordInput.product_price}  className="form-control" />
                                        <span className="text-danger">{medicalrecordInput.error_list.product_price}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Description</label>
                                        <input type="text" name="product_description" onChange={handleInput} value={medicalrecordInput.product_description}  className="form-control" />
                                        <span className="text-danger">{medicalrecordInput.error_list.product_description}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Product</button>
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

export default AddMedicalRecord;