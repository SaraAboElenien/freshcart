import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { Bars } from 'react-loader-spinner'; // Assuming Bars is imported from 'react-loading-icons'
import { UserContext } from '../../Context/UserContext';
import { useContext } from 'react';

function AllOrders() {
  const { userToken } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { id } = jwtDecode(localStorage.getItem('userToken'));
    getUserOrders(id);
  }, []);

  async function getUserOrders(id) {
    setIsLoading(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/' + id);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setIsLoading(false);
  }

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
          />
        </div>
      ) : (
        <>
          <h1>Your Orders</h1>
          {orders.map((order) => (
            <div key={order.id} className="row">
              <div className="order shadow rounded p-4 my-5">
                <div className="d-flex align-items-center">
                  <h2 className='fw-bolder h1'>#{order.id}</h2>
                  <h4 className='fw-bold text-primary mx-4'>Processing</h4>
                </div>
                <p>You have ordered {order.cartItems.length} items.</p>
                <div className="d-flex">
                  {order.cartItems.map((item) => (
                    <img key={item._id} src={item.product.imageCover} style={{ width: 150 }} alt="" />
                  ))}
                </div>
                <hr />
                <p><strong>Total amount: </strong>{order.totalOrderPrice} EGP</p>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default AllOrders;
