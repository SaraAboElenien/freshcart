import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext} from '../../Context/UserContext';
import { useContext } from 'react';
import toast from 'react-hot-toast';


export default function Wishlist() {
  const [favoriteItem, setFavoriteItem] = useState([]);
  const [numsOfItems, setNumsOfItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { userToken  } = useContext(UserContext);

  async function removeFromWishList(id) {
    setIsLoading(true);

    try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: localStorage.getItem('userToken')
        }
      });
      
      console.log(response.data.data);
      getYourFaveItem();
    } catch (error) {
      console.log(error);
    }
  }

  async function getYourFaveItem() {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          token: localStorage.getItem('userToken')
        }
      });
      
      const data = response.data.data;
      setNumsOfItems(response.data.count);
      setFavoriteItem(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getYourFaveItem();
  }, []);



  async function addProductToCart(productId) {

    const { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/cart', {
        productId
    }, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
    // console.log(data);
    if (data.success) {
        toast.success('Product added to cart successfully' , {
            duration: 4000,
            position: 'top-center'
        })
    } else{
        toast.error('Failed to add product to cart')
    }
}


  return (
    <>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center  min-vh-100">
          <i className="fas fa-spin fa-spinner fa-5x"></i>
        </div>
      )  : (
        <div className="container mt-5 pt-3">
          {numsOfItems >= 1 ? (
            <h2 className='text-center my-3 bg-main text-light p-2 fw-bolder'>Your Favorite Items : {numsOfItems}</h2>
          ) : (
            <h2 className='text-center my-3 bg-danger bg-gradient text-light p-2 fw-bolder'>There are no items in your wishlist</h2>
          )}

          {favoriteItem.map(data => (
            <div key={data.id} className="card my-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={data.imageCover} className="img-fluid rounded-start w-50" alt={data.imageCover}/>
                </div>
                <div className="col-md-8 position-relative">
                  <div className ="card-body">
                    <h5 className="card-title mb-4 fw-bolder">{data.title.split(" ").slice(0,3).join(' ')}</h5>
                    <ul className='list-unstyled'>
                      <li className='fw-bolder mb-2'>Brand: <span className='color-main'>{data.brand.name}</span></li>
                      <li className='fw-bolder mb-2'>Category: <span className='color-main'>{data.category.name}</span></li>
                      <li className='fw-bolder mb-2'>Rating: <i className="fa fa-star rating-color"></i>{data.ratingsAverage}</li>
                    </ul>
                    <p className='fw-bolder'> Price: {data.price} L.E</p>
                    
                    <i className="fa-solid fa-xmark p-2 close-btn rounded-2 position-absolute cursor-pointer  bottom-0 end-0 m-3" onClick={() => removeFromWishList(data.id)}></i>
                    {/* Here you can add the addToCart function if needed */}
                    {     <button onClick={() => addProductToCart(data.id)} className='btn bg-main text-white w-50 mt-2'>Add To Cart</button>

}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
