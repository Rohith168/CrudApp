import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const EmpDetails = () => {
    const { empid } = useParams();

    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8080/navbar/users?id=" + empid).then((res) => {

            return res.json();
        }).then(async(resp) => {
            empdatachange(resp);
            
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    useEffect(()=>{
        // console.log(empdata.toString());
    },[empdata])
    return (
        <div>
            {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

               <div className="container mt-5">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title ">
                    <h2>Employee Create</h2>
                </div>
                <div className="card-body"></div>

                {empdata.empdata &&
                    <div>
                        <h2>The Employee name is : <b>{empdata.empdata.name}</b>  {empdata.empdata._id}</h2>
                        <h3>Contact Details</h3>
                        <h5>Email is : {empdata.empdata.email}</h5>
                        <h5>Phone is : {empdata.empdata.phone}</h5>
                        <Link className="btn btn-danger" to="/">Back to Listing</Link>
                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default EmpDetails;