import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

export default function SubCategories() {
  const { id } = useParams();
  const [categories, setCategories] = useState({});
  const [subCategories, setSubCategories] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function getCategories(id) {
    try {
      const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/` + id);
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    } finally {
      setIsLoading(false);
    }
  }


  async function getAllSubCategories(id) {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/` + id + `/subcategories`)
    setSubCategories(data.data)
  }

  useEffect(() => {
    getCategories(id)
    getAllSubCategories(id);
  }, []);


  return (
    <>
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
        <div className="card whole-details mb-4 mt-4 w-75 m-auto ">
          <div className="row g-0 position-relative">
            <div className="col-md-4 position-relative">
              <img src={categories.image} alt="SubCategories" style={{ height: 300 }} className='w-100' />
            </div>
            <div className="col-md-8 d-flex align-items-center">
              <div className="card-body ">
                <p className="fw-bolder text-main top-0 end-0 position-absolute rounded-start-pill badge fs-6 bg-main text-light">{categories.slug}</p>
                <div className=' d-flex flex-wrap'>
                  {subCategories.length > 0 ?
                    subCategories.map((data) =>
                      <p key={data._id} className='  fs-6 fw-bolder badge text-bg-secondary mx-2'>{data.name}</p>
                    ) : <p className=' badge text-bg-danger fs-5 mx-auto'>There are no SubCategories to display on this Category</p>}
                </div>
                <span className='card-title mb-0 bottom-0 end-0 position-absolute rounded-start-pill bg-main p-2 fw-bolder text-light '>SubCategories</span>

              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

