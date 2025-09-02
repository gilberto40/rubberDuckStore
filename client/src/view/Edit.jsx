import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "bootstrap";

function Edit() {
  const [data, setData] = useState({
        color: '',
        size: '',
        price: 0,
        quantity: 0
    });
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/warehouse/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const updatedData = {
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity)
    };
    axios.patch(`/warehouse/update/${id}`, updatedData)
        .then((res) => {
            navigate("/");
        })
      .catch((err) => {
        if (err.response.status == 400) {
            alert("No changes have been made. The information is the same.");
        }
      });
  }

  return (
    <div className="container-fluid vw-100 vh-100">
        <div className="d-flex justify-content-center">
            <h1>Duck {id}</h1>
        </div>
      
        <div className="col-lg-8 offset-lg-2">
            <Link to="/" className="btn btn-danger">
                Back
            </Link>
            <form onSubmit={handleSubmit}>
            <div className="form-group my-1">
                <label htmlFor="color">Color</label>
                <input className="form-control" value={data.color} type="text" readOnly/>
            </div>
            <div className="form-group my-1">
                <label htmlFor="size">Size</label>
                <input className="form-control" value={data.size} type="text" readOnly/>
            </div>
            <div className="form-group input-group my-1">
                <label htmlFor="price">Price</label>
                <div className="input-group my-1">
                     <input className="form-control" value={data.price} type="number" name="price" required onChange={(e) => setData({ ...data, price: e.target.value })}/>
                    <div className="input-group-append">
                        <span className="input-group-text">$</span>
                    </div>
                </div>
            </div>
            <div className="form-group my-1">
                <label htmlFor="quantity">Quantity</label>
                <input className="form-control" value={data.quantity} type="number" name="quantity" required onChange={(e) => setData({ ...data, quantity: e.target.value })}/>
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

export default Edit;

