import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { Toaster } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51IgFdvFUgBS6TTQVvV8DByXXZKysjOCgF1wcuRUzWj8lpotvl2z42ELOiV3TiGFOkpXSc8pWsgSClzJxIzLsT6Xw00BP0ZeDyd');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <RouterProvider router={router} />
      <Toaster />
    </Elements>
  </React.StrictMode>
);
