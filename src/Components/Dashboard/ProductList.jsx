import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ProductList = () => {
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

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://product-management-dashboard-with.onrender.com/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter(product => product._id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  // Function to determine status based on stock quantity
  const getStatus = (stock) => {
    return stock > 0 ? 'In Stock' : 'Out of Stock';
  };

  // Function to show confirmation dialog before deletion
  const confirmDelete = (productId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(productId)
        },
        {
          label: 'No',
          onClick: () => { } // Do nothing if canceled
        }
      ]
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Product List</h2>
      <table className="w-full text-left border-collapse text-white">
        <thead>
          <tr>
            <th className="border-b dark:border-gray-700 py-3 px-4">Name</th>
            <th className="border-b dark:border-gray-700 py-3 px-4">Description</th>
            <th className="border-b dark:border-gray-700 py-3 px-4">Price</th>
            <th className="border-b dark:border-gray-700 py-3 px-4">Stock</th>
            <th className="border-b dark:border-gray-700 py-3 px-4">Status</th>
            <th className="border-b dark:border-gray-700 py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border-b dark:border-gray-700 py-3 px-4">{product.name}</td>
              <td className="border-b dark:border-gray-700 py-3 px-4">{product.description}</td>
              <td className="border-b dark:border-gray-700 py-3 px-4">${product.price}</td>
              <td className="border-b dark:border-gray-700 py-3 px-4">{product.stock}</td>
              <td className="border-b dark:border-gray-700 py-3 px-4">{getStatus(product.stock)}</td>
              <td className="border-b dark:border-gray-700 py-3 px-4 flex space-x-2">
                <Link
                  to={`/dashboard/editProduct/${product._id}`}
                  className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => confirmDelete(product._id)} // Call confirmDelete instead of handleDelete directly
                  className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
