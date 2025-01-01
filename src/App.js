// import logo from './logo.svg';
// import './App.css';

import Home from'./Components/home/Home';
import Layout from "./Components/Layout/Layout";
import Products from './Components/Products/Products';
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands"
import Notfound from "./Components/Notfound/Notfound";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { UserContext } from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/productDetails/productDetails';
import  { Toaster } from 'react-hot-toast';
import SubCategories from './Components/SubCategories/SubCategories';
import BrandDetails from './Components/BrandDetails/BrandDetails';
import UpdateUserData from './Components/UpdateUserData/UpdateUserData';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Address from './Components/Address/Address';
import AllOrders from './Components/AllOrders/AllOrders'
import Favorite from './Components/Favorite/Favorite';


let routers = createHashRouter([
{path:'/' , element:<Layout/> , children: [
{index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
{path:"cart" , element:<ProtectedRoute><Cart/></ProtectedRoute>},
{path:"products" , element:<ProtectedRoute><Products/></ProtectedRoute>},
{path:"categories" , element:<ProtectedRoute><Categories/></ProtectedRoute>},
{path:"brands" , element:<ProtectedRoute><Brands/></ProtectedRoute>},
{path:"allorders" , element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
{path:"productDetails/:id" , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
{path:"categories/:id" , element:<ProtectedRoute><SubCategories/></ProtectedRoute>},
{path:"brands/:id" , element:<ProtectedRoute><BrandDetails/></ProtectedRoute>},
{path:"address/:cartId" , element:<ProtectedRoute><Address/></ProtectedRoute>},
{path:"Favorite" , element:<ProtectedRoute><Favorite/></ProtectedRoute>},
{path:"ResetPassword" , element:<ResetPassword/>},
{path:"UpdateUserData" , element:<UpdateUserData/>},
{path:"ForgotPassword" , element:<ForgotPassword/>},


{path:"login" , element:<Login/>},
{path:"register" , element:<Register/>},

{path:"*" , element:<Notfound/>},

]}
])
function App() {
  const { setUserToken } = useContext(UserContext);
useEffect(()=> {
if (localStorage.getItem("userToken") !==null) 
{
  setUserToken(localStorage.getItem("userToken"))
}

} , []);


  return<><RouterProvider router={routers}></RouterProvider>
  <Toaster/>
</>
}

export default App;
