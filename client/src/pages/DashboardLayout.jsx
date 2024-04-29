import React from 'react'
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import { Outlet, redirect, useLoaderData,useNavigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import customFetch from '../../../utils/customFetch';
import { toast } from 'react-toastify';
import '../styles/Dashboard.css'
const DashboardContext = createContext();
const DashboardLayout = () => {
  // temp
  const navigate = useNavigate();

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
  };
  
  
  return (
    <DashboardContext.Provider
      value={{
        logoutUser,
      }}
    >
    <div className='main-dashboard'>
         <Logo/>
         <Navbar logoutUser={logoutUser}/>
         <Outlet/>
    </div>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;