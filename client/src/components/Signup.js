import React, { useState } from 'react'
import mainAxios from "axios"
export const axios=mainAxios.create({
    baseURL:"http://localhost:8080"
  })

const Signup = () => {
    const [user, setuser] = useState({
        name:"",email:"",password:"",cpassword:""
    })
    let name,value;
    const handleInput=(e)=>
    {
        e.preventDefault();
        name=e.target.name;
        value=e.target.value;
        setuser({...user,[name]:value})
        console.log(user);
    }
    const PostData=async(e)=>
    {
  e.preventDefault();
  const{name,email,password,cpassword}=user;
  try {
    const response = await axios({
      method: "post",
      url: "/register",
      data: user,
      headers: { "Content-Type": "application/json" },
    });
    localStorage.setItem("user",JSON.stringify(response.data.userResponse))
    localStorage.setItem("token",JSON.stringify(response.data.auth))
    console.log("Register sucessfull");
    setuser({name:"",email:"",password:"",cpassword:""})
  } catch(error) {
    console.log(error)
  }  
    }
  return (
    <section className="vh-100" style={{backgroundcolor: "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderradius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" className="form-control" name="name" value={user.name} onChange={handleInput}/>
                      <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" className="form-control" name="email" value={user.email} onChange={handleInput}/>
                      <label className="form-label" htmlFor ="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control" name="password" value={user.password} onChange={handleInput}/>
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" className="form-control" name="cpassword" value={user.cpassword} onChange={handleInput}/>
                      <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-lg" onClick={PostData}>Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Signup