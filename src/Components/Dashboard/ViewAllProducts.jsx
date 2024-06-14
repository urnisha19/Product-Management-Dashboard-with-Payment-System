import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewAllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://product-management-dashboard-with.onrender.com/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const getStatus = (stock) => {
        return stock > 0 ? 'In Stock' : 'Out of Stock';
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <div key={product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <img
                        src={product.imageURL}
                        alt={product.name}
                        className="h-48 w-full object-cover object-center"
                    />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">${product.price}</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{product.description}</p>
                        <p className={`text-sm font-medium py-1 px-2 rounded-md inline-block ${product.stock > 0 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                            {getStatus(product.stock)}
                        </p>
                        <div className="mt-4 flex justify-between items-center">
                            <Link
                                to={`/dashboard/purchaseProduct/${product._id}`}
                                className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700"
                            >
                                Purchase
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ViewAllProducts;