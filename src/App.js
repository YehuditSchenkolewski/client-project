import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "./redux/actions/auth.actions";
import * as AuthService from "./services/auth.services";
import { getPersonalDetailsByToken } from "./services/info.services";
import Login from './components/Login';
import Info from './components/Info';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import LogOut from './components/LogOut';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    initUser()
  }, []);

  const initUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // dispatch(loggedIn(true));
      dispatch(setAuth(getPersonalDetailsByToken(token)))

    } else {
      // dispatch(loggedIn(false));
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route exact path="/info" element={<Info />} />
            <Route exact path="/logOut" element={<LogOut />} />
          </Routes>
        </div>

      </BrowserRouter>

    </div>
  );
}

export default App;