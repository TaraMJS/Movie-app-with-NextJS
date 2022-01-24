import Layout from "../components/Layout";
import Heading from "../components/typography/Heading";
import axios from "axios";
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Feedback from "../components/Feedback";

//login form uses locally hosted strapi installation for authorization
export default function Login() {
  const [message, setMessage] = useState("");

  const router = useRouter();

  function loginUser(event) {

    event.preventDefault() 
    const getUser = document.querySelector("#username-input");
    const getPassword = document.querySelector("#password-input");

    const usernameValue = getUser.value;
    const passwordValue = getPassword.value;

   checkCredentials(usernameValue, passwordValue);
 }

async function checkCredentials(username, password){

await axios.post('http://localhost:1337/api/auth/local', {
    identifier: username,
    password: password,
    Headers:{
      "Content-Type" : "application/json"
    }
  })
  .then(response => {
    if(response.data.jwt){
     router.push("/admin"); 
    }
  })
  .catch(error => {
    console.log('An error occurred:', error.response);
    setMessage("Something went wrong!");
  });
  }

    return (
      <>
      <Layout />
      <Heading>Login</Heading> 
      <Feedback type="danger" content={message} />
      <form onSubmit={loginUser} className="form shadow">
       <div className="form-content">
       <div className="form-field">
        <label className="form-label">Username</label>
        <input name="username" id="username-input" placeholder="username" className="form-input" />
        </div>
        <div className="form-field">
        <label className="form-label">Password</label>
        <input name="password" id="password-input" placeholder="password" type="password" className="form-input" />
        </div>
        <button className="form-button">Login</button>
       </div>
      </form>
      </>
    );
  }