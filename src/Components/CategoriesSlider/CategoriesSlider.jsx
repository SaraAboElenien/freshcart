import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function CategoriesSlider() {

    const [categories, setCategories] = useState([])

    var settings = { 
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows: false,
    };

    async function getAllCategories() {
        const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
        setCategories(data.data);
    }

    useEffect(() => {
        getAllCategories()
    }, [])




    return ( 
        <div className="container ">
        <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
        <Slider {...settings} >
            {categories.map((category, index) => {
                return <div key={index}>
                    <img style={{height: 200}} src={category.image} className='w-100' alt="" />
                    <h5 className='text-center fw-bolder' style={{color:'#0aad0a'}}>{category.name}</h5>
                </div>
            })}
        </Slider>
        </div>
        </div>
    )
}
