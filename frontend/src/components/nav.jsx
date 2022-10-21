import React from 'react';
import {useNavigate} from 'react-router-dom';
import './css/nav.css';
function Navbar(props) {
    const navigate = useNavigate();
    var tokenfor = sessionStorage.getItem("tokenfor");
    let handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    }
    let handleLogin = () => {
        navigate("/");
    }
    return (
        <nav className="navbar navbar-default navbar-expand-lg navbar-light">
            <div className="navbar-header">
                <a className="navbar-brand" href="/">AMS &nbsp;<b>Portal</b></a>
                <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
                    <span className="navbar-toggler-icon"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>
            <div id="navbarCollapse" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    {tokenfor === "admin" && <>
                        <li><a href="/">Home</a></li>
                        <li><a href="/face">Find Face</a></li>
                        <li><a href="/attend">Attendance</a></li>
                        <li><a href="/student">All Students</a></li>
                        <li><a href="/add">Add Students</a></li>
                    </>}

                </ul>
                <form className="navbar-form form-inline navbar-right ml-auto">
                    {tokenfor === "admin" && <>
                        <div className="input-group search-box">
                            <button onClick={() => handleLogout()} style={{ marginLeft: "2px" }} type="button" className="btn btn-primary">Logout</button>
                        </div>
                    </>}
                    {tokenfor === null && <>
                        <div className="input-group search-box">
                            <button onClick={() => handleLogin()} style={{ marginLeft: "2px" }} type="button" className="btn btn-primary">Login</button>
                        </div>
                    </>}<br/><br/>
                </form>
            </div>
        </nav>
    );
}

export default Navbar;
