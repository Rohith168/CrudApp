import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  mainAxios from 'axios';


export const axios=mainAxios.create({
  baseURL:"http://localhost:8080"
})

const Signin = () => {
  useEffect(()=>{
    localStorage.setItem("isloggedin",false)
  })
    const [user, setuser] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    let name, value
    const handleUserinput = (e) => {
      name = e.target.name
      value = e.target.value
      setuser({ ...user, [name]: value })
      // localStorage.setItem(name, value);
      // console.log(user);
    }
    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = user;
        
      //  make axios post request
       await axios({
          method: "post",
          url: "/signin",
          data: user,
          headers: { "Content-Type": "application/json" },
        }).then(response => {
          // console.log(response.data.auth);
          localStorage.setItem("isloggedin",true)
          localStorage.setItem("token",response.data.auth)
          navigate('/Navbar')
          
    
        }).catch(error => {
          alert("failed")
          console.log(error.message)
        });
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
  
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>
  
                  <form className="mx-1 mx-md-4">
  
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input type="email" id="form3Example3c" className="form-control" name="email" value={user.email} onChange={handleUserinput} />
                        <label className="form-label" htmlFor ="form3Example3c"   >Your Email</label>
                      </div>
                    </div>
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input type="password" id="form3Example4c" className="form-control" name="password" value={user.password} onChange={handleUserinput}/>
                        <label className="form-label" htmlFor="form3Example4c" >Password</label>
                      </div>
                    </div>
  
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" className="btn btn-primary btn-lg"onClick={loginUser}>Signin</button>
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

export default Signin