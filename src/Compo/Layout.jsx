import React from 'react'
import NavBar from './Navbar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <>
    <NavBar></NavBar>
    <Outlet></Outlet>
    </>
  )
}

export default Layout