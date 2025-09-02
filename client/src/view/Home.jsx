import axios from 'axios'; 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home() {
    const [data, setData] = useState([]);


        const [isModalOpen, setIsModalOpen] = useState(false);
    const [duckToDeleteId, setDuckToDeleteId] = useState(null);

    useEffect(() => {
  
        axios.get('/warehouse')
        .then((res) => {
            setData(res.data.data)
        })

    }, []);

    const handleDeleteClick = (id) => {
        setDuckToDeleteId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (duckToDeleteId) {
            axios.delete(`/warehouse/delete/${duckToDeleteId}`)
                .then(() => {
                    setData(prevData => prevData.filter(duck => duck.id !== duckToDeleteId));
                    setIsModalOpen(false);
                    setDuckToDeleteId(null);
                })
                .catch((err) => console.log(err));
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setDuckToDeleteId(null);
    };

     return (
        <div className='container-fluid vh-100 vw-100'>
            <div className="d-flex justify-content-center">
                <h2>Duck Warehouse</h2>
            </div>
            

            <div className="col-lg-8 offset-lg-2">
                <div className="mb-3">
                    <Link className='btn btn-success' to='/create'>Add duck</Link>
                </div>
                
                <table className="table  table-bordered">
                    
                    <thead className="thead-light">
                        <tr>
                            <th className="table-active">ID</th>
                            <th className="table-active">Color</th>
                            <th className="table-active">Size</th>
                            <th className="table-active">Price</th>
                            <th className="table-active">Quantity</th>
                            <th className="table-active w-25">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((duck)=>{
                                return (
                                    <tr key={duck.id}>
                                        <td>{duck.id}</td>
                                        <td>{duck.color}</td>
                                        <td>{duck.size}</td>
                                        <td>{duck.price}</td>
                                        <td>{duck.quantity}</td>
                                        <td className="w-25">
                                            <Link className='btn mx-2 btn-success' to={`/update/${duck.id}`}>Edit</Link>
                                            <button onClick={()=>handleDeleteClick(duck.id)} className='btn mx-2 btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
             {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content w-25">
                        <h4>Confirm Delete</h4>
                        <p>Do you want to delete this duck?</p>
                        <div className="modal-actions">
                            <button className="btn btn-danger" onClick={handleConfirmDelete}>Yes, delete it</button>
                            <button className="btn btn-secondary" onClick={handleCancelDelete}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home