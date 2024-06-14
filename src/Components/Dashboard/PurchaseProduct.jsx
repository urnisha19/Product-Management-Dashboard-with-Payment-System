import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

const PurchaseProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://product-management-dashboard-with.onrender.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to fetch product');
      }
    };

    fetchProduct();
  }, [productId]);

  const handlePurchase = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create payment intent on the backend
      const paymentIntentRes = await axios.post(`https://product-management-dashboard-with.onrender.com/products/${productId}/purchase`, { quantity });

      if (!paymentIntentRes.data.clientSecret) {
        throw new Error('Missing client secret');
      }

      setClientSecret(paymentIntentRes.data.clientSecret);

      const cardElement = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(paymentIntentRes.data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Customer Name',
          },
        },
      });

      if (paymentResult.error) {
        toast.error(`Payment failed: ${paymentResult.error.message}`);
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        await axios.post(`https://product-management-dashboard-with.onrender.com/products/${productId}/confirm-payment`, { paymentIntentId: paymentResult.paymentIntent.id, quantity });
        toast.success('Purchase successful');
        navigate('/dashboard/ProductList');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Failed to process payment');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '18px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding: '10px',
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Purchase Product</h2>
      <div className="mb-4">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Product: {product.name}</p>
        <p className="text-lg text-gray-700 dark:text-gray-300">Price: ${product.price}</p>
        <p className="text-lg text-gray-700 dark:text-gray-300">Stock: {product.stock}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-gray-700 dark:text-gray-300 mb-2">Quantity:</label>
        <input
          id="quantity"
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700 focus:outline-none"
        />
      </div>
      <form onSubmit={handlePurchase}>
        <div className="mb-4">
          <CardElement
            options={cardElementOptions}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          disabled={!stripe}
        >
          Purchase
        </button>
      </form>
    </div>
  );
};

export default PurchaseProduct;
