import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../Product/Product';

export default function Products() {
  const [products, setProducts] = useState([]);

  async function getAllProducts() {
    try {
      const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/products');
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
    <div className="row">
      {products.map((product) => {
        return <div key={product.id} className="col-md-3">
          <Product product={product} />
        </div>
      })}
    </div>
    </>
  );
}
