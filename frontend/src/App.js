import React from "react";
import {BrowserRouter,Routes,Route } from "react-router-dom";
import NavBar from "./components/nav";
import Add from "./components/add";
import Attend from "./components/attend";
import Face from "./components/face";
import Student from "./components/student";
import Camera from "./components/camera";
import Login from "./components/login";
export default function App() {
 var title;
 var  loggedIn = false;
  loggedIn = sessionStorage.getItem("token");
    if(loggedIn){
      title = "Logout";
    }
    else{
      title = "Login";
    }
  return (
        <BrowserRouter>
        <NavBar Title={title}/>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/add" element={<Add/>}/>
          <Route exact path="/attend" element={<Attend/>}/>
          <Route exact path="/student" element={<Student/>}/>
          <Route exact path="/face" element={<Face/>}/>
          <Route exact path="/camera" element={<Camera/>}/>
        </Routes>
        </BrowserRouter>
  );
}