import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes() {
    let isauth=localStorage.getItem("isloggedin")
  return (
   isauth!="true"?<Navigate to="/"/>:<Outlet/>
  )
}
