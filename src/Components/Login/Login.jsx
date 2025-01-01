import React, { useContext, useState } from 'react';
import './Login.module.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';
import { UserContext } from '../../Context/UserContext'

export default function Login() {
  const { setUserToken, setUserData } = useContext(UserContext);

  const navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLaoding, setisLaoding] = useState(false);

  async function loginSubmit(values) {
    setisLaoding(true);
    try {
      const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      const { data } = response;
      if (data && data.message === 'success') {
        setisLaoding(false);
        localStorage.setItem('userToken', data.token);
        setUserToken(data.token)
        setUserData(data.user)
        navigate('/');
      }
    } catch (err) {
      setisLaoding(false);
      seterror(err.response.data.message);
    }
  }


  const validationSchema = Yup.object({
    email: Yup.string().required("email is required!").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid Email!"),
    password: Yup.string().required("password is required!").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Your password must be at least 8 characters long.\nIt must contain at least one lowercase letter (a-z).\nIt must contain at least one uppercase letter (A-Z).\nIt must contain at least one digit (0-9)."),

  })


  const { values, handleSubmit, handleChange, errors, touched, handleBlur, isValid, dirty } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginSubmit,
    validationSchema
  });

  return (
    <>
      <div className="w-75 my-5 m-auto ">


        <h1 className='mt-5'>Login Now:</h1>
        <form onSubmit={handleSubmit}>

          <label htmlFor="email" className='my-1'><i className="fa-solid fa-envelope pe-2"></i>Email:</label>
          <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" id='email' className='form-control ' name='email' />
          {errors.email && touched.email && <div className="alert alert-danger">{errors.email}</div>}

          <label htmlFor="password" className='my-1'><i className="fa-solid fa-lock pe-2"></i>Password:</label>
          <input onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" id='password' className='form-control ' name='password' />
          {errors.password && touched.password && <div className="alert alert-danger">{errors.password}</div>}


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

          <button type='submit' disabled={!(isValid && dirty)} className='btn bg-main text-white'>Login</button> <p >Already have an account?  <Link className='fs-3x fw-bolder link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ' to={'/register'}>Register </Link></p> 
          </div>
          <Link to='/ForgotPassword'>Forgot your password?</Link>
          </>

}
        </form>
      </div>
    </>


  )
}
