import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Categories.css';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
export default function Categories() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  async function getAllCategories() {
    setIsLoading(true)
    const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
    setIsLoading(false)
    setCategories(data.data);
  }

  useEffect(() => {
    getAllCategories()
  }, [])


  return <>
    {isLoading ? (

      <div className='loading d-flex align-items-center justify-content-center vh-100'>
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /> </div>) : (

<div className="container">
      <div className="row  mt-5 ">
        {categories.map((category) => (
          <div className="col-md-4 " key={category._id}>
            <Link to={category._id}>
              <div className="card mb-4 ">
                <img style={{ height: 400 }} src={category.image} className=" w-100 " alt="" />
                <div className="card-body">
                  <h5 style={{ color: '#0aad0a' }} className="card-title text-center fw-bolder ">{category.name}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}

      </div>
      </div>
    )}
  
  </>
}
