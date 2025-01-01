import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Address() {
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(false); // New state variable
    const { cartId } = useParams();
    const { userToken } = useContext(UserContext);
    const navigate = useNavigate(); // Use useNavigate hook to get navigation function

    const validationSchema = Yup.object({
        details: Yup.string().required('Details is required'),
        city: Yup.string().required('City is required'),
        phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number")
    });

    async function onSubmit(values) {
        setIsLoading(true);
        setErrorMsg('');
        try {
            let endPoint = isOnline ?
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` :
                `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

            const { data } = await axios.post(endPoint, {
                shippingAddress: values
            }, {
                params: {
                    url: 'http://localhost:3000'
                },
                headers: {
                    token: userToken || localStorage.getItem('userToken')
                }
            });

            if (isOnline) {
                window.open(data.session.url, '_self');
            } else {
                setTimeout(() => {
                    navigate("/allorders"); // Use navigate function to navigate
                }, 3000);
            }

        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'Error processing payment');
            console.error('Error processing payment:', error);
        }
        setIsLoading(false);
    }

    const { handleSubmit, values, handleChange, errors, touched, handleBlur, isValid } = useFormik({
        initialValues: {
            details: '',
            city: '',
            phone: '',
        },
        onSubmit,
        validationSchema
    });

    return (
        <div className=" w-75 m-auto my-5">
            <h1>Address :</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="details" className='my-1'><i class="fa-solid fa-info pe-2"></i>Details:</label>
                <input value={values.details} onBlur={handleBlur} onChange={handleChange} type="text" className='form-control mb-3' id='details' name='details' />
                {errors.details && touched.details && <p className='alert alert-danger'>{errors.details}</p>}

                <label htmlFor="city" className='my-1'><i class="fa-solid fa-location-dot pe-2"></i>City:</label>
                <input value={values.city} onBlur={handleBlur} onChange={handleChange} type="text" className='form-control mb-3' id='city' name='city' />
                {errors.city && touched.city && <p className='alert alert-danger'>{errors.city}</p>}

                <label htmlFor="phone" className='my-1'><i class="fa-solid fa-phone-volume pe-2"></i>Phone:</label>
                <input value={values.phone} onBlur={handleBlur} onChange={handleChange} type="tel" className='form-control mb-3' id='phone' name='phone' />
                {errors.phone && touched.phone && <p className='alert alert-danger'>{errors.phone}</p>}

                <div className="form-check my-3">
                    <input className="form-check-input" type="checkbox" onChange={() => setIsOnline(!isOnline)} id="flexCheckChecked" />
                    <label className="form-check-label" htmlFor="flexCheckChecked">Online Payment</label>
                </div>

                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                {isLoading ? (
                    <button disabled type='button' className='btn bg-main px-3 text-white ms-auto d-block px-4'>
                        <i className='fas fa-spin fa-spinner'></i>
                    </button>
                ) : (
                    <button type='submit' disabled={!isValid} className='btn bg-main px-3 text-white ms-auto d-block'>
                        Checkout
                    </button>
                )}
            </form>
        </div>
    );
}

