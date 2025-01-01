import React from 'react';
import Slider from "react-slick";
import '../MainSlider/MainSlider.css'
import slide1 from '../Assets/Images/WhatsApp Image 2024-03-03 at 13.56.03_0aca9d46.jpg';
import slide2 from '../Assets/Images/WhatsApp Image 2024-03-03 at 13.56.03_2a5fb302.jpg';
import slide3 from '../Assets/Images/istockphoto-1319625327-612x612.jpg';

export default function MainSlider() {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        arrows: false,
        dots: true,
    };


    return <>


<div className="container-fluid py-5 mb-5 mt-5 hero-header ">
    <div className="container py-5 ">
        <div className="row g-5 align-items-center">
            <div className="col-md-12 col-lg-7">
                <h4 style={{color:'#ffb524'}} className='mb-3 fa-2x fw-bolder'>100% Free Delivery</h4>
                <h1 style={{color:'#0aad0a'}} className="mb-5 display-3 ">Whatever You Want & Wherever You Are</h1>
                <div className=" position-relative mx-auto  d-flex align-items-center ">
                    <input className="  py-3  rounded-pill flex-grow-1 w-75 border border-warning" type="text" placeholder='  Search' />
                    <button style={{right:0, color:'#0aad0a'}} className="btn bg-main border-2  border-warning position-absolute py-3 px-4 rounded-pill text-white" type='submit' >Submit Now</button>
                </div>
            </div>
            <div className="col-md-12 col-lg-5">
                <Slider {...settings}>
                    <img className='w-100 rounded-5' src={slide1} alt="slider" />
                    <img className='w-100 rounded-5' src={slide2} alt="slider" />
                    <img className='w-100 rounded-5' src={slide3} alt="slider" />
                </Slider>
            </div>
        </div>
    </div>
</div>




















        {/* <div className="row mb-5 gx-0 shadow p-3 mb-5 bg-body-tertiary rounded ">
            <div className="col-md-9">
            <Slider {...settings} >
<img height={400} className='w-100' src={slide1} alt="slider" />
<img  height={400} className='w-100' src={slide2} alt="slider" />
<img  height={400} className='w-100' src={slide3} alt="slider" />
            </Slider>
           </div>
            <div className="col-md-3 ">
<img height={200} className='w-100 ' src={blog1} alt="" />
<img height={200} className='w-100' src={blog2} alt="" />
            </div>
        </div> */}


    </>


}
