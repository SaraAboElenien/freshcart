import React from 'react';
import './Footer.module.css';
import PayPall from '../Assets/Images/PayPal.svg.png';
import MasterCard from '../Assets/Images/mastercard-4-logo-png-transparent.png';
import Amazon from '../Assets/Images/download.png';
import appStore from '../Assets/Images/apple-app-store-logo.jpg';
import googlePlay from '../Assets/Images/en_badge_web_generic.png';



export default function Footer() {

  return <>
    <footer className='bg-main-light pt-5 pb-2 '>
      <div className="container">
        <h4>Get The Fresh Card App</h4>
        <p>We will send you a link, open it on your phone to download the app.</p>
        <div className="d-flex">
          <div className="col-sm-10">
            <input type="email" name="Email" id="email" className='form-control py-2 ' placeholder='Email.....' />
          </div>
          <div className="col-sm-2 ps-3 ">
            <button className=' btn w-100 bg-main text-white ' >Share App Link</button>
          </div>
        </div>

        <div className=" line border-bottom border-2 my-4"></div>


        <div className='d-flex justify-content-between align-items-center flex-wrap'>
          <ul className=' list-unstyled d-flex'>
            <li>Payment Partners</li>
            <li className='me-1'><img style={{ height: 25 }} src={Amazon} alt={Amazon} className='pay' /></li>
            <li className='me-1'><img style={{ height: 35 }} src={MasterCard} alt={MasterCard} className='pay' /></li>
            <li className='me-1'><img style={{ height: 20 }} src={PayPall} alt={PayPall} className='pay' /></li>

          </ul>
          <ul className=' list-unstyled d-flex  align-items-center'>
            <li>Get deliveries with FreshCart</li>
            <li><img style={{ height: 50 }} src={googlePlay} alt={googlePlay} className='store' /></li>
            <li><img style={{ height: 35 }} src={appStore} alt={appStore} className='store' /></li>
          </ul>
        </div>
        <div className=" line border-bottom border-2 my-3"></div>
      </div>



    </footer>


  </>
}
