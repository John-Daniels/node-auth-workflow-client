import React from "react";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import { ToastContainer } from "react-toastify";
import { toastOptions } from "./constants/toastify.constant";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>

      <>
        <ToastContainer {...toastOptions} />
      </>
    </div>
  );
};

export default App;
