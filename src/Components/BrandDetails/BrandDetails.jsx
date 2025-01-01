import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'

export default function BrandDetails() {

  const { id } = useParams()
  const [brandDetails, setBrandDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)


  async function getBrandDetails() {
    setIsLoading(true)
    let { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/brands/' + id)
    setIsLoading(false)
    setBrandDetails(data.data);
  }

  useEffect(() => {
    getBrandDetails(id)
  }, [])



  return (<>

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
      <div className="card whole-details mb-4 mt-4 w-50 m-auto rounded  ">
        <div className="row g-0 position-relative mt-5">
          <div className="col-md-4 position-relative ">
            <img src={brandDetails.image} alt="brandDetails" style={{ height: 300 }} className='w-100' />
          </div>
          <div className="col-md-8 d-flex align-items-center">
            <div className="card-body ">
              <p className="fw-bolder text-main top-0 end-0 position-absolute rounded-start-pill badge fs-6 bg-main text-light">{brandDetails.slug}</p>
              <h2 className='card-title bg-main p-2 text-center rounded fw-bolder text-light '>{brandDetails.name}</h2>

            </div>
          </div>
        </div>
      </div>
    )}

  </>
  )
}
