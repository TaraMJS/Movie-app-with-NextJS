import Layout from "../components/Layout";
import Heading from "../components/typography/Heading";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from 'react';
import Feedback from "../components/Feedback";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name").min(3, "Must be at least 3 characters"),
  surname: yup.string().required("Please enter your surname").min(4, "Must be at least 4 characters"),
  email: yup.string().required("Please enter an email address").email("Please enter a valid email address"),
  message: yup.string().required("Please enter your message").min(10, "The message must be at least 10 characters"),
  select: yup.string().required("Please select a option"),
});

export default function contact() {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
});

function onSubmit(data) {
if (data){
  setMessage("Your form was successfully sent!");
 }
}

console.log(errors);

    return (
      <>
      <Layout />
      <Heading>Contact</Heading>
      <Feedback type="success" content={message} />

      <form onSubmit={handleSubmit(onSubmit)} className="form shadow">

      <div className="form-content">

          <div className="form-field">
            <label className="form-label">Name</label>
            <input {...register("name")} className="form-input" />
            {errors.name && <span>{errors.name.message}</span>}
           </div>

           <div className="form-field">
            <label className="form-label">Surname</label>
            <input {...register("surname")} className="form-input" />
            {errors.surname && <span>{errors.surname.message}</span>}
          </div>

          <div className="form-field">
            <label className="form-label">Email</label>
            <input {...register("email")} className="form-input" />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className="form-field">
            <label className="form-label">Message</label>
            <textarea {...register("message")} className="form-input" />
            {errors.message && <span>{errors.message.message}</span>}
          </div>

          <div className="form-field">
           <label className="form-label">Subject</label>
           <select {...register("select")} className="form-input">
            <option value="">choose subject</option>
            <option value="1">subject one</option>
            <option value="2">subject two</option>
           </select>
           {errors.select && <span>{errors.select.message}</span>}
           </div>

        <button className="form-button">Send</button>
        </div>
      </form>
      
      </>
    );
  }