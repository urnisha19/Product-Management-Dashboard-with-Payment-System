import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import DashBoard from "../Pages/DashBoard";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import PrivateRoute from "./PrivateRoute";
import AddProduct from "../Components/Dashboard/AddProduct";
import ProductList from "../Components/Dashboard/ProductList";
import EditProduct from "../Components/Dashboard/EditProduct";
import PurchaseProduct from "../Components/Dashboard/PurchaseProduct";
import ViewAllProducts from "../Components/Dashboard/ViewAllProducts";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <DashBoard />
            },
            {
                path: "addProduct",
                element: (
                    <PrivateRoute>
                        <AddProduct />
                    </PrivateRoute>
                )
            },
            {
                path: "viewAllProducts",
                element: (
                    <PrivateRoute>
                        <ViewAllProducts />
                    </PrivateRoute>
                )
            },
            {
                path: "ProductList",
                element: (
                    <PrivateRoute>
                        <ProductList />
                    </PrivateRoute>
                )
            },
            {
                path: "editProduct/:productId",
                element: (
                    <PrivateRoute>
                        <EditProduct />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(`https://product-management-dashboard-with.onrender.com/products/${params.productId}`),
            },
            {
                path: "purchaseProduct/:productId",
                element: (
                    <PrivateRoute>
                        <PurchaseProduct />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(`https://product-management-dashboard-with.onrender.com/products/${params.productId}`),
            },
        ]
    }
]);
