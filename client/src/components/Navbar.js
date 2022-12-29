import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate, useParams } from "react-router-dom";

const Navbar = () => {
    
    const [empdata, empdatachange] = useState(null);
    const [search, setsearch] = useState("");
    const navigate = useNavigate();
    const [dispData, setDispData] = useState(null)
    const { empid } = useParams();
    useEffect(() => {
        const userLocal = localStorage.getItem("isloggedin")
        if (!userLocal) {
            navigate("/")
        }
    })
    useEffect(() => {
        if (search.length > 0) {
            setDispData(empdata.filter(user => user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search) || user._id.toLowerCase().includes(search)))
        } else {
            setDispData(empdata)
        }
    }, [search, empdata])
    useEffect(() => {
        fetch("http://localhost:8080/users", { headers: { authorization: localStorage.getItem('token') } }).then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {

        })
    }, [])
    const handlelogout = () => {
        navigate("/")
    }
    const Loadedit = (_id) => {
        navigate("users/" + _id);
        // console.log(_id);
    }

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8080/navbar/users?id=" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }
    const LoadDetail = (id) => {
        navigate("/users/detail/" + id);
    }
    return (
        <><nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <div className="container-fluid ">
                <a className="navbar-brand me-auto" href="#">CRUD APP</a>
                <nav>
                    <div className="collapse navbar-collapse " id="navbarNav"  >
                        <li className="nav-item col px-md-5 ">
                            <button type="button" className="btn btn-outline-secondary" onClick={handlelogout}>logout</button>
                        </li>
                    </div>
                </nav>
            </div>
        </nav>


            <div className="container mt-4">
                <div className="card">
                    <div className="card-title ">
                        <h2>Employee Listing</h2>
                    </div>
                    <div className="input-group d-flex justify-content-end rounded">
                        <div className="w-25 p-3">
                            <input type="search" className="form-control rounded " placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={e => setsearch(e.target.value.toLowerCase())} />
                        </div>
                        <i className="fas fa-search"></i>
                    </div>

                    <div className="card-body">
                        <div className="divbtn">
                            <Link to="employee/create" className="btn btn-success">Add New (+)</Link>
                        </div>
                        <table className="table table-bordered" >
                            <thead className="bg-dark text-white">
                                <tr key={"tefc"}>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Phone</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>

                                {dispData &&
                                    dispData.map(item => (
                                        <tr key={item.id}>
                                            <td key={item._id}>{item._id}</td>
                                            <td key={item.name}>{item.name}</td>
                                            <td key={item.email}>{item.email}</td>
                                            <td key={item.phone}>{item.phone}</td>
                                            <td><a onClick={() => { Loadedit(item._id) }} className="btn btn-success me-2">Edit</a>
                                                <a onClick={() => { Removefunction(item._id) }} className="btn btn-danger me-2">Remove</a>
                                                <a onClick={() => { LoadDetail(item._id) }} className="btn btn-primary me-2">Details</a>
                                            </td>
                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar