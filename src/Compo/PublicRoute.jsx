import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({children}) => {
 let user =  useSelector(state=>state.auth.user);
 if(user){
  return <Navigate to={user.role === "teacher"?"/teacherDash":"/studentDash"}/>
 }
  return children
  
}

export default PublicRoute