import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.module.css';
import Logo from '../Assets/Images/freshcart-logo.svg';
import { UserContext} from '../../Context/UserContext';

export default function Navbar() {
  const { userToken , setUserToken } = useContext(UserContext);
const navigate = useNavigate();
function logOut(){
localStorage.removeItem("userToken");
setUserToken(null);
navigate('/login');
}


  return <>
    <nav id="main-nav" className="navbar navbar-expand-lg  bg-main-light shadow-lg  p-3 mb-5 bg-body-tertiary rounded">
      <div className="container">
        <Link to="/" className="navbar-brand  ">
          <img src={Logo} alt="freshcart logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">


            {userToken !== null ? <>
              <li className="nav-item">
                <Link to="/" className="nav-link "> Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link ">Products</Link>
              </li>
              <li className="nav-item">
                <Link to="/categories" className="nav-link ">Categories</Link>
              </li>
              <li className="nav-item">
                <Link to="/brands" className="nav-link ">
                  Brands
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/allorders" className="nav-link ">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link "><i class="fa-solid fa-cart-shopping"></i></Link>
              </li>
              <li className="nav-item">
                <Link to="/favorite" className="nav-link "><i class="fa-regular fa-heart"></i></Link>
              </li>


            </> : ""}
          </ul>

          <ul className="navbar-nav ms-auto  mb-2 mb-lg-0 ">
            <li className="nav-item d-flex align-items-center" >
              <i className='fab fa-facebook mx-2'></i>
              <i className='fab fa-twitter mx-2'></i>
              <i className='fab fa-instagram mx-2'></i>
              <i className='fab fa-tiktok mx-2'></i>
              <i className='fab fa-youtube mx-2'></i>
              <Link to="/UpdateUserData" className="nav-link "><i class="fa-solid fa-circle-user fa-2x mx-2"></i></Link>
            </li>


            {userToken !== null ? <>
              <li className="nav-item">
                <span onClick={()=>logOut()} className="nav-link cursor-pointer ">
                  Logout
                </span>
              </li>
            </> : <>

              <li className="nav-item">
                <Link to="/login" className="nav-link ">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link ">
                  Register
                </Link>
              </li>
            </>}


          </ul>
        </div>
      </div>
    </nav>


  </>
}
