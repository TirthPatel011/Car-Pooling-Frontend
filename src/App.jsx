import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { RiderSidebar } from "./components/layout/RiderSidebar";
// import { RiderProfile } from "./components/rider/RiderProfile";
import { Login } from "./components/common/Login";
import { Signup } from "./components/common/Signup";
import { AdminSidebar } from "./components/layout/AdminSidebar";
import { AddScreen } from "./components/admin/AddScreen";
import { PassangerSidebar } from "./components/layout/PassangerSidebar";
import axios from "axios";
// import "./assets/adminlte.css";
// import "./assets/adminlte.min.css";
// import { ADDscreen } from "./components/rider/AddScreen";
import PrivateRoutes from "./hooks/PrivateRoutes";
import { LandingPage } from "./components/common/LandingPage";
import React from 'react';
import { ForgotPassword } from './components/common/ForgotPassword';

import { ResetPassword } from "./components/common/ResetPassword";

// import './App.css'
function App() {

  axios.defaults.baseURL = "http://localhost:3000"
  
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = ""; // Remove the unwanted class for login and signup
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);

  return (
    <div className={location.pathname === "/login" || location.pathname === "/signup" ? "" : "app-wrapper"}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path ="/resetpassword/:token" element={<ResetPassword/>}></Route>

        
        <Route element={<PrivateRoutes />}>
          <Route path="/rider" element={<RiderSidebar />}>
            {/* <Route path="ADDscreen" element={<ADDscreen />} />
            <Route path="profile" element={<RiderProfile />} /> */}
          </Route>
       
          <Route path="/admin" element={<AdminSidebar />}>
            {/* <Route path="AddScreen" element={<AddScreen />} /> */}
          </Route>
      
          <Route path="/passanger" element={<PassangerSidebar />}>
            {/* <Route path="addscreen" element={<ADDscreen />} /> */}
          </Route>
        </Route>
      </Routes>
    </div>
  ); 
}

export default App;