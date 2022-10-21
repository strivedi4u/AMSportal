import {useNavigate} from 'react-router-dom';
import React, { useState , useEffect } from 'react';
import swal from 'sweetalert';
import './css/login.css';
function Login() {
    const navigate = useNavigate();
    var loggedIn = false;
    loggedIn = sessionStorage.getItem("token");
    useEffect(() => {
        if (loggedIn) {
            navigate("/student");
        }
    },);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   const handleSubmit= async (e)=>{
        e.preventDefault();
        const response= await fetch("/api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email:email,password:password})

        })

        const json= await response.json();


        if(json.success){
            sessionStorage.setItem('token',json.authToken);
			sessionStorage.setItem('tokenfor',json.tokenfor);
            navigate("/student");
        }
        else{
            swal("Ohh No!", json.error + " !", "error");
        }
	}
    return (
<>
<div className="login-form">
	<h2 className="text-center"><b>Admin Login</b></h2>
    <form>
		<div className="avatar" style={{backgroundColor:"transparent"}}>
			<img src="https://yt3.ggpht.com/5qAj3nd-NdyUX3eRARBbLV2lUJL3T3qUnZG3H2eBB3FeYjjj60iSRUfkovabULPiYyCbKNMnig=s900-c-k-c0x00ffffff-no-rj" alt="Avatar" />
		</div>           
        <div className="form-group">
        	<input type="email" onChange={e => setEmail(e.target.value)} className="form-control input-lg" name="username" placeholder="Username" required="required" />	
        </div>
		<div className="form-group">
            <input type="password" onChange={e => setPassword(e.target.value)} className="form-control input-lg" name="password" placeholder="Password" required="required" />
        </div>        
        <div className="form-group clearfix">
            <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-lg pull-right">Sign in</button>
        </div>		
    </form>
    </div>
</>
    );
}

export default Login;
