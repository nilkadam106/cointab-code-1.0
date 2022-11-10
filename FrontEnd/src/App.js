import Signin from './components/Signin'
import UserManagement from './components/UserManagement'
import Details from './components/Details'
import Edit from './components/Edit'
import Add from './components/Add'

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css';
import React, { Component } from 'react';



function App() {
  
  return (
    <>
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/manageuser" element={<UserManagement />} />
        <Route path="/viewUser" element={<Details />} />
        <Route path="/editUser" element={<Edit />} />
        <Route path="/adduser" element={<Add />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" />
    </div>
    
    </>
  )
}

export default App