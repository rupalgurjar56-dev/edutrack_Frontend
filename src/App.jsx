import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Layout from './Compo/Layout';
import TeacherDashBoard from './Pages/TeacherDashboard';
import StudentDashBoard from './Pages/StudentDashBoard';
import Error from './Pages/Error';
import ProtectedRoute from './Compo/ProtectedRoute';
import Home from './Pages/Home';
import PublicRoute from './Compo/PublicRoute';
const App = () => {
  let router = createBrowserRouter([
    {
      element: <Layout/>,
      errorElement:<Error/>,
      children: [{
        path: "/",
        element:<Home/>
      },{
        path: "/login",
        element:<PublicRoute>
           <Login/>
        </PublicRoute>
      },
      {
        path: "/signup",
        element: <PublicRoute>
        <Signup/>
        </PublicRoute>
      },
      
      ]
 
    },{
        path: "/studentDash",
        element: <ProtectedRoute isAllowed="student" >
        <StudentDashBoard />
        </ProtectedRoute>
      },
      {
        path: "/teacherDash",
        element:<ProtectedRoute isAllowed="teacher" >
          <TeacherDashBoard/>
        </ProtectedRoute>
      },
  ]);
  return (
   <RouterProvider router={router} />
  )
}

export default App