import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    let navigate=useNavigate();
    const [credentials, setCredentials] = useState({email:"", password:""});
    const handleSubmit = async(e) => {
        e.preventDefault();
    const response=await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json=await response.json();
    console.log(json);

    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('authToken', json.authToken)
      navigate("/");

    }
    else {
      alert("Enter Valid Credentials")
    }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
    <>
      <div className='container'>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/createuser" className="m-3 btn btn-danger">New User</Link>
</form>
</div>
    </>
  )
}
