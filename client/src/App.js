import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Addemp from "./components/Addemp";
import Editemp from './components/Editemp';
import React from "react";
import {Route,Routes} from "react-router-dom";
import EmpDetails from './components/EmpDetails';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <div className="App">
          <Routes>
      <Route exact path='/' element={<Signin/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
      <Route element={<ProtectedRoutes/>}>
      <Route exact path='/Navbar' element={<Navbar/>}/>
      <Route path='Navbar/employee/create' element={<Addemp/>}></Route>
      <Route path='navbar/users/:empid' element={<Editemp />}></Route>
      <Route path='/users/detail/:empid' element={<EmpDetails />}></Route></Route>
      </Routes>
    </div>
  );
}

export default App;
