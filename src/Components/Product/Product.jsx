import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
 import toast from 'react-hot-toast'
 import { UserContext} from '../../Context/UserContext';

function Product({ product }) {
    const { userToken } = useContext(UserContext);

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

    async function addProductToFavorite(productId) {
        try {
            const { data } = await axios.post(
                'https://route-ecommerce.onrender.com/api/v1/wishlist',
                { productId },
                { headers: { token: userToken || localStorage.getItem('userToken') } }
            );
            if (data.success) {
                toast.success('Product added to wishlist successfully', { duration: 4000, position: 'top-center' });
            } else {
                toast.error('Failed to add product to wishlist');
            }
        } catch (error) {
            console.error('Error adding product to wishlist:', error);
            toast.error('Failed to add product to wishlist');
        }
    }





    return (
        <div className="container ">
           <div className="row col-md-12">
        <div className="product overflow-hidden px-2 py-3 cursor-pointer">
            <Link to={'/productDetails/' + product.id} className='a'>
                <img className='w-100' src={product.imageCover} alt="" />
                <h5 className='font-sm text-main'>{product.category.name}</h5>
                <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                <p className='d-flex justify-content-between'>
                    <span >{product.price} EGP</span>
                    <span>
                        <i className='fas fa-star rating-color me-1'></i>
                        {product.ratingsAverage}
                    </span>
                </p>
            </Link>
           
<div className='d-flex justify-content-between'>
            <button onClick={() => addProductToCart(product.id)} className='btn bg-main  w-25 '><i className="fa-solid fa-cart-plus text-white"></i></button>
            <button onClick={() => addProductToFavorite(product.id)} className='btn bg-main  w-25  '><i className="fa-solid fa-heart text-white"></i></button>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Product