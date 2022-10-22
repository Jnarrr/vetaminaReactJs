import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from '../Navbar';

function AddProduct() {

    const history = useHistory();
    const [productInput, setProduct] = useState({
        product_name: '',
        product_price: '',
        product_description: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]: e.target.value })
    }

    const saveProduct = (e) => {
        e.preventDefault();
        
        const data = {
            product_name:productInput.product_name,
            product_price:productInput.product_price,
            product_description:productInput.product_description,
        }

        axios.post(`/api/add-product`, data).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setProduct({
                    product_name: '',
                    product_price: '',
                    product_description: '',
                    error_list: [],
                });
                history.push('/products');
            }
            else if(res.data.status === 422)
            {
                setProduct({...productInput, error_list: res.data.validate_err });
            }
        });
    }

    return (
        <>
        <Navbar />
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Product 
                                    <Link to={'/products'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveProduct} >
                                    <div className="form-group mb-3">
                                        <label>Product Name</label>
                                        <input type="text" name="product_name" onChange={handleInput} value={productInput.product_name} className="form-control" />
                                        <span className="text-danger">{productInput.error_list.product_name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Price</label>
                                        <input type="text" name="product_price" onChange={handleInput} value={productInput.product_price}  className="form-control" />
                                        <span className="text-danger">{productInput.error_list.product_price}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Description</label>
                                        <input type="text" name="product_description" onChange={handleInput} value={productInput.product_description}  className="form-control" />
                                        <span className="text-danger">{productInput.error_list.product_description}</span>
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

export default AddProduct;