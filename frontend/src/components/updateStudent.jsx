import React, { useState } from 'react';
import swal from 'sweetalert';
import './css/update.css';
function UpdateStudent(props) {
    var [updateName, setUpdateName] = useState(props.name);
    var [mobile, setMobile] = useState(props.mobile);
    var [email, setEmail] = useState(props.email);
    var [address, setAddress] = useState(props.address);
    var [rollno, setRollno] = useState(props.rollno);
    console.log("Hello user");
    console.log(updateName);
    console.log(props.name);
  //const ids = props.id;
    let handleSubmit = async (e) => {
     e.preventDefault();
     var  URL = '/api/student/' + props.id;
      fetch(URL ,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token":sessionStorage.getItem('token')
        },
        body: JSON.stringify({
            name:updateName,
            mobile: mobile,
            email :email,
            address : address,
            rollno : rollno
        }),
      })
        .then((res) => {
            setUpdateName("");
            setEmail("");
            setAddress("");
            setRollno("");
            setMobile("");
          swal("Good job!", "Your details is successfully updated!", "success");
          window.location.reload(false);
        })
        .catch((err) => alert("Details Upload Error"));
    };
  return (
    <>
<div id="myModal" className="modal fade">
	<div className="modal-dialog modal-login">
		<div className="modal-content">
			<div className="modal-header">				
				<h4 className="modal-title">Update Details</h4>
				<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div className="modal-body">
				<form>
					<div className="form-group">
						<input type="text" defaultValue ={props.name} onChange={e => setUpdateName(e.target.value)} className="form-control"  placeholder="Enter your Name" required="required" />
					</div>
					<div className="form-group">
          <input  type="text" defaultValue = {props.email} onChange={event => setEmail(event.target.value)} className="form-control"  placeholder="Enter Your Email" required="required" />
						</div>
            <div className="form-group">
          <input type="text" defaultValue= {props.rollno} onChange={event => setRollno(event.target.value)} className="form-control"  placeholder="Enter Your Roll No" required="required" />
						</div>
            <div className="form-group">
          <input type="text" defaultValue={props.mobile} onChange={event => setMobile(event.target.value)} className="form-control"  placeholder="Enter Your Mobile" required="required" />
						</div>
                        <div className="form-group">
          <input type="text" defaultValue = {props.address} onChange={event => setAddress(event.target.value)} className="form-control"  placeholder="Enter Your Address" required="required" />
						</div>
					<div className="form-group">
						<button onClick={handleSubmit} className="btn btn-primary btn-block btn-lg" >Update</button>
					</div>
				</form>				
			</div>
		</div>
	</div> 
</div>     
    </>
  );
}

export default UpdateStudent;