import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';
function ProductDetails() {
    const { userToken } = useContext(UserContext);
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    async function getProductDetails() {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);
            setProductDetails(data.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProductDetails();
    }, [id]);

    async function addProductToCart(productId) {
        try {
            const { data } = await axios.post(
                'https://route-ecommerce.onrender.com/api/v1/cart',
                { productId },
                { headers: { token: userToken || localStorage.getItem('userToken') } }
            );
            if (data.success) {
                toast.success('Product added to cart successfully', { duration: 4000, position: 'top-center' });
            } else {
                toast.error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add product to cart');
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



    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

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
                        <div className="container">
                <div className='row align-items-center py-5'>
                    <div className="col-md-3">
                        <Slider {...settings}>
                            {productDetails.images?.map((img, index) => (
                                <img key={index} src={img} className='w-100' alt="" />
                            ))}
                        </Slider>
                    </div>
                    <div className="col-md-9">
                        <h2 className='mt-2'>{productDetails?.title}</h2>
                        <h5 className='font-sm text-main mt-2'>{productDetails?.category?.name}</h5>
                        <p className='mt-2'>{productDetails?.description}</p>
                        <p className='d-flex justify-content-between mt-2'>
                            <span>{productDetails?.price} EGP</span>
                            <span>
                                <i className='fas fa-star rating-color me-1'></i>
                                <span>{productDetails?.ratingsAverage}</span>
                            </span>
                        </p>
                        <div className="d-flex align-items-center justify-content-between">
                        <button onClick={() => addProductToCart(productDetails.id)} className='btn bg-main text-white w-25 mt-2'>Add To Cart</button>
                        <button onClick={() => addProductToFavorite(productDetails.id)} className='btn bg-main text-white w-25 mt-2'>Add To fave</button>
                        </div>
                    </div>
                </div>
                </div>
            )}
        </>
    );
}

export default ProductDetails;
