import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './css/add.css';

function Add() {
    const navigate = useNavigate();
    var loggedIn = false;
    loggedIn = sessionStorage.getItem("token");
    const [rollno, setRollno] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [address, setAddress] = useState();
    useEffect(() => {
        if (!loggedIn) {
            navigate("/");
        }
    },[]);
    const handleClick = (e) => {
        sessionStorage.setItem("rollno", rollno);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("mobile", mobile);
        sessionStorage.setItem("address", address);
        navigate('/camera');
    }

    return (
        <>
            <div id="#myModal" className="modl fad">
                <div className="modal-dialog modal-lg contact-modal">
                    <div className="modal-content">
                        <div>
                            <div className="modal-header">
                                <h4 className="modal-title">Fill Details</h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" onChange={e => setRollno(e.target.value)} className="form-control" placeholder="Enter Your Enrollment Number" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Enter Your Email Address" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" onChange={e => setAddress(e.target.value)} className="form-control" placeholder="Enter Your Address" required />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" onChange={e => setName(e.target.value)} className="form-control" placeholder="Enter Your Full Name" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" onChange={e => setMobile(e.target.value)} className="form-control" placeholder="Enter Your Mobile Nmber" required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button onClick={handleClick} className="btn btn-primary" style={{ backgroundColor: "#04AA6D" }}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Add;
