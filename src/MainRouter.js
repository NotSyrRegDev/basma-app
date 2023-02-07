import React from 'react';
import {  BrowserRouter,  Route,   Routes, } from "react-router-dom";
import App from './App';
import Home from './pages/Home';
import OrgnizationsPage from './pages/OrgnizationsPage';
import SignInPage from './pages/SignInPage';
import SignupPage from './pages/SignupPage';
import SingleOrgnization from './pages/SingleOrgnization';
import ReportPage from './pages/ReportPage';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage';


const MainRouter = () => {
  return (
    <div className='container-sm' >
     <BrowserRouter>

        <Navbar />
       <Routes>
         
           <Route
             path="/"
             element={
               <Home />
             }
           />
           
           <Route
             path="/organizations"
             element={
               <OrgnizationsPage />
             }
           />

           <Route
             path="/signUp"
             element={
               <SignupPage />
             }
           />

           <Route
             path="/signIn"
             element={
               <SignInPage />
             }
           />

           <Route
             path="/profile"
             element={
               <SingleOrgnization />
             }
           />
           
           <Route
             path="/report"
             element={
               <ReportPage />
             }
           />

           <Route
             path="/admin"
             element={
               <AdminPage />
             }
           />

           <Route
             path="/map"
             element={
               <App />
             }
           />

          
         
        
       </Routes>
     
     </BrowserRouter>
    </div>
  )
}

export default MainRouter