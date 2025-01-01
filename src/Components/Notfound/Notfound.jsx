import React from 'react';
import './Notfound.module.css';
import error from '../Assets/Images/error.svg'
export default function Notfound() {
  return <>
  <div className="not-found404 d-flex align-items-center justify-content-center ">
    <img src={error} alt=""  />
  </div>
  </>
}
