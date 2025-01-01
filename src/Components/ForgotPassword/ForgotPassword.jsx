import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Request reset code, Step 2: Confirm reset code
  const [error, setError] = useState('');

  const validationSchema = step === 1 ? 
    Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }) :
    Yup.object({
      resetCode: Yup.string().required('Required').matches(/^[0-9]{6}$/, 'Reset code must be 6 numbers'),
    });

  const initialValues = step === 1 ? { email: '' } : { resetCode: '' };

  const handleSubmit = (values, { setSubmitting }) => {
    const endpoint = step === 1 ? 'forgotPasswords' : 'verifyResetCode';

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/${endpoint}`, values)
      .then(response => {
        console.log(response);
        if (step === 1) {
          // Move to step 2 if email submission was successful
          setStep(2);
        } else {
          // If successful, navigate to ResetPassword component
          navigate('/ResetPassword');
        }
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
      <h1>{step === 1 ? 'Forgot Password' : 'Confirm Reset Code'}</h1>
      {step === 1 ? (
        <p>Forgot your password? Enter your email address below and we'll send you instructions on how to reset it.</p>
      ) : (
        <p>Please enter the 6-digit reset code sent to your email address.</p>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {step === 1 ? (
              <div>
                <label htmlFor="email" className='my-1'><i className="fa-solid fa-envelope pe-2"></i>Email:</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email">
                  {msg => <div className="alert alert-danger">{msg}</div>}
                </ErrorMessage>
              </div>
            ) : (
              <div>
                <label htmlFor="resetCode" className='my-1'><i className="fa-solid fa-key pe-2"></i>Reset Code:</label>
                <Field type="text" name="resetCode" className="form-control" />
                <ErrorMessage name="resetCode">
                  {msg => <div className="alert alert-danger">{msg}</div>}
                </ErrorMessage>
              </div>
            )}
            <button className='btn bg-main text-white mt-3' type="submit" disabled={isSubmitting}>
              {step === 1 ? 'Submit' : 'Confirm'}
            </button>
            {error && <div className="alert alert-danger">{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;

