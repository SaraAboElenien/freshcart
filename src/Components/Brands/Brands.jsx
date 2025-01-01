import './Brands.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';

export default function Brands() {

  const [brands, setBrands] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  async function getAllBrands() {
    setIsLoading(true)
    const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/brands')
    setIsLoading(false)
    setBrands(data.data);

  }

  useEffect(() => {
    getAllBrands()
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
        {brands.map((brand) => (
          <div className="col-md-3 " key={brand._id}>
            <Link to={brand._id}>
              <div className="card mb-3 ">
                <img style={{ height: 200 }} src={brand.image} className=" w-100 " alt="" />
                <div className="card-body">
                  <h5 style={{ color: '#0aad0a' }} className="card-title text-center fw-bolder ">{brand.name}</h5>
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
