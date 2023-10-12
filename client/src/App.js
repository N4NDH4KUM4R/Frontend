import React from "react";
import {  Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="" exact element={<Login />} />
        <Route path="/register" exact element={<SignUp />} />
        <Route path="/userdetails" exact element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
