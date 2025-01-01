
import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email:Yup.string().email("email isn't valid").required('email is required'),
    newPassword:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,15}$/, 'password must start captial letter and least 6 char'),
});

  const initialValues = { email: '', newPassword: '' };

  const handleSubmit = (values, { setSubmitting }) => {
    axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
      .then(response => {
        console.log(response);
        setSuccess(true);
        navigate('/login'); // Redirect to login page upon successful password reset
      })
      .catch(error => {
        console.error('Error:', error);
        setError('An error occurred. Please try again.');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className='mt-5 mb-5 w-75 m-auto'>
      <h1>Reset Password:</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email" className='my-1'><i className="fa-solid fa-lock pe-2"></i>Email:</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="newPassword" className='my-1'><i className="fa-solid fa-lock pe-2"></i>New Password:</label>
              <Field type="password" name="newPassword" className="form-control"/>
              <ErrorMessage name="newPassword" component="div" />
            </div>
            <button className='btn bg-main text-white mt-3' type="submit" disabled={isSubmitting}>
              Submit
            </button>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Password reset successful!</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
