import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditProduct(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [productInput, setProduct] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {
        
        const product_id = props.match.params.id;
        axios.get(`/api/edit-product/${product_id}`).then( res => {

            if(res.data.status === 200)
            {
                setProduct(res.data.product);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/products');
            }
        });

    }, [history, props.match.params.id]);

    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]: e.target.value });
    }

    const updateProduct = (e) => {
        e.preventDefault();
        
        const product_id = props.match.params.id;
        // const data = productInput;
        const data = {
            product_name:productInput.product_name,
            product_price:productInput.product_price,
            product_description:productInput.product_description,
        }

        axios.put(`/api/update-product/${product_id}`, data).then(res=>{
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

    if(loading)
    {
        return <h4>Loading Edit Product Data...</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Products 
                                    <button className='btn btn-danger btn-sm float-end' onClick={() => history.goBack()}>Back</button>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateProduct} >
                                    <div className="form-group mb-3">
                                        <label>Product Name</label>
                                        <input type="text" name="product_name" onChange={handleInput} value={productInput.product_name} className="form-control" />
                                        <span className="text-danger">{errorInput.product_name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Price</label>
                                        <input type="text" name="product_price" onChange={handleInput} value={productInput.product_price}  className="form-control" />
                                        <span className="text-danger">{errorInput.product_price}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Description</label>
                                        <input type="text" name="product_description" onChange={handleInput} value={productInput.product_description}  className="form-control" />
                                        <span className="text-danger">{errorInput.product_description}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Product</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EditProduct;