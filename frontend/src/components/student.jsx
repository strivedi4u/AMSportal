import React, { useState ,useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './css/table.css';
import UpdateStudent from './updateStudent';


function AllStudent() {
    const navigate = useNavigate();
    var loggedIn = false;
    loggedIn = sessionStorage.getItem("token");
    useEffect(() => {
        if (!loggedIn) {
            navigate("/");
        }
    },);
    const [data, getData] = useState([])
    const [name, setName] = useState();
    const [rollno, setRollno] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [id, setId] = useState();
    var URL = '/api/student';
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = (e) => {
        fetch(URL ,{
            method: "GET",
            headers: {
                'Content-Type':'application/json',
                "auth-token":sessionStorage.getItem('token')
          }}).then((res) =>
                res.json())
            .then((response) => {
                console.log(response);
                getData(response.students);
            })
    }

    const deleteData = (name) => {
        var  URL = '/api/student/' + name;
        axios.delete(URL,{
            method: "DELETE",
            headers: {
                'Content-Type':'application/json',
                "auth-token":sessionStorage.getItem('token')
          }}).then((res)=>{
            console.log(res.data);
            window.location.reload(false);
        }).catch(err=>{
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
						<h2 style={{color: "black"}} className="text-center">All Student <b>Details</b></h2>
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
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, i) => (
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{item.rollno}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td>{item.address}</td>
                        <td>{item.date}</td>
                        <td>
                        <span  style={{cursor: "pointer", color:"blue"}} className="view" onClick={() => {  setId(item._id); setName(item.name); setMobile(item.mobile);  setAddress(item.address); setRollno(item.rollno); setEmail(item.email)} }  title="edit" href="#myModal"  data-toggle="modal"><i className="material-icons">&#xE254;</i></span>
                         &nbsp; &nbsp; &nbsp;<span  style={{cursor: "pointer", color:"red"}} onClick={() => { deleteData(item._id);   }} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></span>
                        </td>
                    </tr> 
                        ))} 
                    
                </tbody>
                
            </table>
           
        </div>
    </div>        
    </center>
    <UpdateStudent name= {name} mobile= {mobile}  email= {email}  address={address} rollno={rollno} id={id} />
   </>
  );
}

export default AllStudent;
