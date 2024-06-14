# Product Management Dashboard with Payment System

## Overview

This project is a Product Management Dashboard that integrates a payment system. It enables users to manage products and securely process payments using the MERN (MongoDB, Express, React, Node.js) stack. The application includes robust user authentication, product management features, payment integration with Stripe, and stringent security measures for data integrity and user safety.

-   Live Link: [product-management-dashboard-with-payment-system.vercel.app](https://product-management-dashboard-with-payment-system.vercel.app/)
-   Server: [https://product-management-dashboard-with.onrender.com/](https://product-management-dashboard-with.onrender.com/)

## Features

1.  **Authentication System**:
    
    -   User authentication (sign up, log in, log out) using JWT.
    -   Integration with Firebase for user authentication.
2.  **Dashboard Features**:
    
    -   View a list of products.
    -   Add new products (name, description, price, image).
    -   Edit and delete own products.
    -   Stock management: reduce stock on purchase; set "Out of Stock" if quantity is 0.
    -   Secure product purchasing from other users.
3.  **Payment Integration**:
    
    -   Integration with Stripe for secure payments.
4.  **Database Management**:
    
    -   MongoDB is used for data storage.
5.  **Validation and Error Handling**:
    
    -   Form validation and error handling ensure data integrity.
6.  **Security Measures**:
    
    -   Users can only edit or delete their own products.
    -   JWT implementation for secure authentication.

## Tech Stack

### Frontend

-   **React**: JavaScript library for building user interfaces.
-   **Axios**: Promise-based HTTP client for backend requests.
-   **React Router**: Library for routing in React applications.
-   **React Hot Toast**: Toast notifications for user feedback.
-   **Tailwind CSS**: Utility-first CSS framework for responsive design.

### Backend

-   **Node.js**: JavaScript runtime for server-side development.
-   **Express.js**: Web framework for Node.js APIs.
-   **MongoDB**: NoSQL database for scalable data storage.
-   **JWT (JSON Web Tokens)**: Securely transmit user information as JSON objects.

### Payment Gateway

-   **Stripe**: Payment processing platform for online transactions.

### Additional Tools

-   **Firebase**: Platform for mobile and web app development, used for authentication.
-   **dotenv**: Module for loading environment variables into `process.env`.
-   **nodemon**: Utility for automatic server restarts during development.
-   **cors**: Middleware for enabling Cross-Origin Resource Sharing in Express.

### Prerequisites

-   Node.js (version 12 or higher)
-   MongoDB
-   Stripe account (for payment integration)
-   Firebase account (for authentication)