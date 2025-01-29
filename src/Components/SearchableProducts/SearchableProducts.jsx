import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../Product/Product';
import  './SearchableProducts.module.css';

function SearchableProducts() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
            setProducts(data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products');
            setLoading(false);
        }
    }

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="hero-header py-5">
            <div className="container">
                {/* Search Input */}
                <div className="row mb-4">
                    <div className="col-md-6 mx-auto position-relative">
                        <input
                            type="text"
                            className="form-control py-3 px-4"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                fontFamily: '"Raleway", sans-serif',
                                border: 'none',
                                borderRadius: '25px',
                                boxShadow: '0 2px 10px rgba(248, 223, 173, 0.2)'
                            }}
                        />
                        <i className="fas fa-search position-absolute"
                           style={{
                               right: '25px',
                               top: '50%',
                               transform: 'translateY(-50%)',
                               color: '#666'
                           }}></i>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-5">
                        <i className="fas fa-spinner fa-spin fa-2x" style={{ color: 'rgba(248, 223, 173, 0.8)' }}></i>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="alert alert-danger text-center" style={{ background: 'rgba(248, 223, 173, 0.1)' }}>
                        {error}
                    </div>
                )}

                {/* Products Grid */}
                <div className="row g-4">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="col-md-3">
                            <Product product={product} />
                        </div>
                    ))}
                    
                    {/* No Results Message */}
                    {!loading && filteredProducts.length === 0 && (
                        <div className="col-12 text-center py-5" style={{ fontFamily: '"Raleway", sans-serif' }}>
                            <p className="mb-0">No products found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchableProducts;