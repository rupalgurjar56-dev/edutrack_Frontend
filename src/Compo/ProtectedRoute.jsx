import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({isAllowed,children}) => {
 let user =  useSelector((state)=>state.auth.user);
 if(!user){
  return <Navigate to="/login"/>
 }
 if(isAllowed && user.role!==isAllowed){
  return <Navigate to={user.role==="teacher"?"/teacherDash":"/studentDash"}/>
 }
  return children;
}

export default ProtectedRoute