import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import Product from '../Product/Product';
import MainSlider from '../MainSlider/MainSlider';
export default function Home() {

  const [products, setProducts] = useState([])

  async function getAllProducts() {
    const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/products')
    setProducts(data.data);
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return <> 
    <MainSlider />

    <CategoriesSlider />
    <div className="container mt-5 mb-5">
    <div className="row">
      {products.map((product) => {
        return <div key={product.id} className="col-md-3">
          <Product product={product} />
        </div>
      })}
    </div>
    </div>
  </>
}