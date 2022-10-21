import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './css/table.css';


function AttendStudent() {
    const navigate = useNavigate();
    var loggedIn = false;
    loggedIn = sessionStorage.getItem("token");
    useEffect(() => {
        if (!loggedIn) {
            navigate("/");
        }
    },);
    const [data, getData] = useState([])
    var URL = '/api/attend';
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = (e) => {
        fetch(URL, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "auth-token":sessionStorage.getItem('token')
            }
        }).then((res) =>
            res.json())
            .then((response) => {
                console.log(response);
                getData(response.attends);
            })
    }

    const deleteData = (name) => {
        var URL = '/api/attend/' + name;
        axios.delete(URL, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "auth-token":sessionStorage.getItem('token')
            }
        }).then((res) => {
            console.log(res.data);
            window.location.reload(false);
        }).catch(err => {
            console.log(err.message)
        })
    };

    return (
        <>
            <center>
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-xs-4">
                                </div>
                                <div className="col-xs-4">
                                    <h2 style={{ color: "black" }} className="text-center">Student Attendance <b>Details</b> </h2>
                                </div>
                                <div className="col-xs-4">
                                </div>
                            </div>
                        </div>
                        <table className="table table-bordered">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Roll No</th>
                                    <th>Name <i className="fa fa-sort"></i></th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Address</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.rollno}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.address}</td>
                                        <td>{item.date}</td>
                                        <td>{item.time}</td>
                                        <td>
                                            &nbsp; &nbsp; &nbsp;<span style={{ cursor: "pointer", color: "red" }} onClick={() => { deleteData(item._id); }} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </center>
        </>
    );
}

export default AttendStudent;
