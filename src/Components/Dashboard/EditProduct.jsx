import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [stock, setStock] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
        const response = await axios.get(`https://product-management-dashboard-with.onrender.com/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        });
        const productData = response.data;
        setProduct(productData);
        setName(productData.name);
        setDescription(productData.description);
        setPrice(productData.price);
        setImageURL(productData.imageURL);
        setStock(productData.stock);
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      name,
      description,
      price,
      imageURL,
      stock,
    };

    try {
      const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
      await axios.patch(`https://product-management-dashboard-with.onrender.com/products/${productId}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });
      toast.success('Product updated successfully');
      navigate('/dashboard/ProductList');
    } catch (error) {
      console.error('Error updating product:', error.message);
      toast.error('Failed to update product');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="description">
            Product Description
          </label>
          <textarea
            id="description"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="imageURL">
            Image URL
          </label>
          <input
            id="imageURL"
            type="text"
            placeholder="Image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
