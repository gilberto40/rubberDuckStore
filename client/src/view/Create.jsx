import { useState } from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

function Create() {
    const [values, setValues] = useState({
        color: '',
        size: '',
        price: '',
        quantity: ''
    })
    
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        axios.post("/warehouse/add", values)
        .then((res) => {
           
            navigate('/');
 
        })
        .catch((err) => console.log(err));
    }

    return (
    <div className="container-fluid vw-100 vh-100">
        <div className="d-flex justify-content-center">
            <h1>Add Duck</h1>
        </div>
        
        <div className="col-lg-8 offset-lg-2">
            <Link to="/" className="btn btn-danger">
                Back
            </Link>
            <form onSubmit={handleSubmit}>
            <div className="form-group my-1">
                <label htmlFor="color">Color</label>
                <select className="form-select" name="color" required onChange={(e) => setValues({ ...values, color: e.target.value })}>
                    <option value="">Select a color</option>
                    <option value="Red">Red</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Black">Black</option>
                </select>
            </div>
            <div className="form-group my-1">
                <label htmlFor="size">Size</label>
                <select className="form-select" name="size" required onChange={(e) => setValues({ ...values, size: e.target.value })}>
                    <option value="">Select size</option>
                    <option value="XLarge">XLarge</option>
                    <option value="Large">Large</option>
                    <option value="Medium">Medium</option>
                    <option value="Small">Small</option>
                    <option value="XSmall">XSmall</option>
                </select>
            </div>
            <div className="form-group input-group my-1">
                <label htmlFor="price">Price</label>
                <div className="input-group my-1">
                        <input className="form-control" type="number" name="price" required onChange={(e) => setValues({ ...values, price: e.target.value })}/>
                    <div className="input-group-append">
                        <span className="input-group-text">$</span>
                    </div>
                </div>
            </div>
            <div className="form-group my-1">
                <label htmlFor="quantity">Quantity</label>
                <input className="form-control" type="number" name="quantity" required onChange={(e) => setValues({ ...values, quantity: e.target.value })}/>
            </div>
            <div className="form-group my-3">
                <button type="submit" className="btn btn-success">
                Save
                </button>
            </div>
            </form>
        </div>
    </div>
    );

}

export default Create;