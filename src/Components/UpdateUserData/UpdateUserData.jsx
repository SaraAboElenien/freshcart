import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import toast from "react-hot-toast";
import { UserContext } from '../../Context/UserContext';
import pic from '../Assets/Images/149071.png'

export default function UpdateUserData() {
  const [isLoading, setIsLoading] = useState(false);
  const { userToken, userData } = useContext(UserContext);

  // Define setNewPassword function
  async function setNewPassword(values) {
    setIsLoading(true)
    try {
      const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, values, {
        headers: {
          token: localStorage.getItem('userToken')
        }
      });
      console.log(response)
      if (response.data.message === "success") {
        toast.success(response.data.message)
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message)
      setIsLoading(false)
    }
  }

  let mySchema = Yup.object({
    currentPassword: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,15}$/, 'password must start captial letter and least 6 char'),
    password: Yup.string().required("password is required!").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Your password must be at least 8 characters long.\nIt must contain at least one lowercase letter (a-z).\nIt must contain at least one uppercase letter (A-Z).\nIt must contain at least one digit (0-9)."),
    rePassword: Yup.string().required('password is required').oneOf([Yup.ref('password')], 'password not match'),
  })

  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      setNewPassword(values)
    }
  })

  return (
    <>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center  min-vh-100">
          <i className="fas fa-spin fa-spinner fa-5x"></i>
        </div>
      ) : (
        <>

          <div className="w-75 my-5 m-auto rounded-5 shadow p-3 mb-5 bg-body-tertiary rounded">
          <div className="user-info ">
<div className="pic text-center ">
<img height={100} className='pb-2' src={pic} alt="" />
          </div>
            <h4><i class="fa-solid fa-user pe-2"></i>Hello: {userData?.name}</h4>
            <div className=" line border-bottom border-2 my-4"></div>
            <h4><i class="fa-solid fa-envelope pe-2"></i>Your logged email is: {userData?.email}</h4>
            <div className=" line border-bottom border-2 my-4"></div>
            <h4><i class="fa-solid fa-phone pe-2"></i>Your phone number is: {userData?.phone}</h4>
          </div>
          <div className=" line border-bottom border-2 my-4"></div>

            <h1 className='mt-5'>Update Password :</h1>
            <form onSubmit={formik.handleSubmit}>

              <label htmlFor="currentPassword" className='my-1'><i className="fa-solid fa-key pe-2"></i>Current Password:</label>
              <input type="password" className="form-control" value={formik.values.currentPassword} name="currentPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.currentPassword && formik.touched.email && <div className="alert alert-danger">{formik.errors.email}</div>}

              <label htmlFor="password" className='my-1'><i class="fa-solid fa-lock  pe-2"></i>password:</label>
              <input type="password" className="form-control" value={formik.values.password} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.password && formik.touched.password && <div className="alert alert-danger">{formik.errors.password}</div>}

              <label htmlFor="rePassword" className='my-1'><i class="fa-solid fa-lock  pe-2"></i>Re-Password:</label>
              <input type="password" className="form-control"  value={formik.values.rePassword} name="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.rePassword && formik.touched.rePassword && <div className="alert alert-danger">{formik.errors.rePassword}</div>}


              <button type="submit" className="btn bg-main  text-white mt-3 " disabled={!(formik.isValid && formik.dirty)}>Reset password</button>


            </form>
          </div>
        </>
      )}
    </>
  )
}
