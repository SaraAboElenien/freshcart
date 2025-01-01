import React, { useState } from 'react';
import './Register.module.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';

export default function Register() {
  const navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLaoding, setisLaoding] = useState(false);

  async function registerSubmit(values) {
    setisLaoding(true);
    try {
      const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
      const { data } = response;
      if (data && data.message === 'success') {
        setisLaoding(false);
        navigate('/login');
      }
    } catch (err) {
      setisLaoding(false);
      seterror(err.response.data.message);
    }
  }


  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required!").min(3, "Your name must be more than 3 characters!").max(20, "Your name must be less than 20 characters!"),
    email: Yup.string().required("email is required!").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid Email!"),
    password: Yup.string().required("password is required!").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Your password must be at least 8 characters long.\nIt must contain at least one lowercase letter (a-z).\nIt must contain at least one uppercase letter (A-Z).\nIt must contain at least one digit (0-9)."),
    rePassword: Yup.string().oneOf([Yup.ref('password')]).required("rePassword is required!"),
    phone: Yup.string().required("phone is required!").matches(/^(01|02)[0-9]{9}$/, "Phone must be a valid Egyptian phone number"),

  })

  // function validate(values) {
  //   const errors = {};

  //   if (values.name === "") {
  //     errors.name = "Name is required!";
  //   } else if (values.name.length < 3) {
  //     errors.name = "Your name must be more than 3 characters!";
  //   } else if (values.name.length > 20) {
  //     errors.name = "Your name must be less than 20 characters!";
  //   }

  //   if (values.email === "") {
  //     errors.email = "Email is required!";
  //   } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
  //     errors.email = "Please enter a valid Email!";
  //   }

  //   if (values.password === "") {
  //     errors.password = "Password is required!";
  //   } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(values.password)) {
  //     errors.password = "Your password must be at least 8 characters long.\nIt must contain at least one lowercase letter (a-z).\nIt must contain at least one uppercase letter (A-Z).\nIt must contain at least one digit (0-9).";
  //   }

  //   if (values.rePassword === "") {
  //     errors.rePassword = "RePassword is required!";
  //   } else if (values.rePassword !== values.password) {
  //     errors.rePassword = "RePassword must match your password";
  //   }

  //   if (values.phone === "") {
  //     errors.phone = "Phone is required!";
  //   } else if (!/^(01|02)[0-9]{9}$/.test(values.phone)) {
  //     errors.phone = "Phone must be a valid Egyptian phone number";
  //   }

  //   return errors;
  // }

  const { values, handleSubmit, handleChange, errors, touched, handleBlur, isValid, dirty } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: registerSubmit,
    validationSchema
  });

  return (
    <>
      <div className="w-75 my-5 m-auto ">

        <h1 className='mt-5'>Register Now:</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className='my-1'><i class="fa-solid fa-user pe-2"></i>Name:</label>
          <input onChange={handleChange} onBlur={handleBlur} value={values.name} type="text" id='name' className='form-control ' name='name' />
          {errors.name && touched.name && <div className="alert alert-danger">{errors.name}</div>}

          <label htmlFor="email" className='my-1'><i class="fa-solid fa-envelope pe-2"></i>Email:</label>
          <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" id='email' className='form-control ' name='email' />
          {errors.email && touched.email && <div className="alert alert-danger">{errors.email}</div>}

          <label htmlFor="password" className='my-1'><i class="fa-solid fa-lock pe-2"></i>Password:</label>
          <input onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" id='password' className='form-control ' name='password' />
          {errors.password && touched.password && <div className="alert alert-danger">{errors.password}</div>}

          <label htmlFor="rePassword" className='my-1'><i class="fa-solid fa-lock pe-2"></i>RePassword:</label>
          <input onChange={handleChange} onBlur={handleBlur} value={values.rePassword} type="password" id='rePassword' className='form-control ' name='rePassword' />
          {errors.rePassword && touched.rePassword && <div className="alert alert-danger">{errors.rePassword}</div>}

          <label htmlFor="phone" className='my-1'><i class="fa-solid fa-phone pe-2"></i>Phone:</label>
          <input onChange={handleChange} onBlur={handleBlur} value={values.phone} type="tel" id='phone' className='form-control ' name='phone' />
          {errors.phone && touched.phone && <div className="alert alert-danger">{errors.phone}</div>}

          {/*errors.phone: This part checks if there is an error message stored in the errors object for the phone field. If there is, it evaluates to true, otherwise it evaluates to false.
&&: This is the logical AND operator in JavaScript. It returns the second expression if the first expression is truthy, otherwise it returns the first expression.  */}

          {isLaoding ? <button className='btn bg-main text-white mt-2 ms-auto d-block' type='button'>

            <Audio
              height="20"
              width="70"
              radius="9"
              color="white"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
         </button> :
         <> <div className="d-flex align-items-center justify-content-between mt-3">
           <button type='submit' disabled={!(isValid && dirty)} className='btn bg-main text-white '>Register</button><p >You do not have an account?  <Link className='fs-3x fw-bolder link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ' to={'/login'}>Login </Link></p>
           </div>
          </>
}


        </form>
      </div>
    </>


  )
}
