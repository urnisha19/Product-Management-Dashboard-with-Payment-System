import { Link, Outlet, useLocation } from "react-router-dom";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/firebase.config";
import { useEffect, useState } from "react";

export default function DashboardLayout() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = auth.currentUser;
      setUser(currentUser);
      if (currentUser?.email) {
        fetch(`https://product-management-dashboard-with.onrender.com/user/${currentUser.email}`)
          .then((res) => res.json())
          .then((data) => setUserInfo(data))
          .catch((error) => {
            console.error("Error fetching user info:", error);
          });
      }
    };
    loadUser();
  }, []);

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [signOut] = useSignOut(auth);
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="bg-gray-500 min-h-screen flex flex-col md:flex-row">
      <aside
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed top-0 z-10 h-full w-full md:w-64 lg:w-1/4 xl:w-1/5 2xl:w-1/6 bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h5 className="text-2xl font-medium text-gray-600 dark:text-white">Product Management</h5>
          <button
            className="md:hidden text-gray-600 dark:text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="text-center mt-8">
          <img
            src={userInfo?.photoURL}
            alt=""
            className="m-auto h-10 w-10 rounded-full object-cover lg:h-28 lg:w-28"
          />
          <h5 className="mt-4 text-xl font-semibold text-gray-600 lg:block dark:text-gray-300">
            {userInfo?.displayName}
          </h5>
          <span className="text-gray-400 lg:block">{userInfo?.email}</span>
        </div>

        <ul className="mt-8 space-y-2 tracking-wide flex-1 overflow-y-auto">
          <li className={`${isActive("/dashboard") ? "bg-gradient-to-r from-sky-600 to-cyan-400" : ""} relative flex items-center space-x-4 rounded-xl px-4 py-3 text-white`}>
            <Link className="-mr-1 font-medium" to={"/dashboard"}>
              Dashboard Home
            </Link>
          </li>
          <li className={`${isActive("/dashboard/viewAllProducts") ? "bg-gradient-to-r from-sky-600 to-cyan-400" : ""} relative flex items-center space-x-4 rounded-xl px-4 py-3 text-white`}>
            <Link to={"/dashboard/viewAllProducts"}>View All Products</Link>
          </li>
          <li className={`${isActive("/dashboard/ProductList") ? "bg-gradient-to-r from-sky-600 to-cyan-400" : ""} relative flex items-center space-x-4 rounded-xl px-4 py-3 text-white`}>
            <Link to={"/dashboard/ProductList"}>Manage All Products</Link>
          </li>
          <li className={`${isActive("/dashboard/addProduct") ? "bg-gradient-to-r from-sky-600 to-cyan-400" : ""} relative flex items-center space-x-4 rounded-xl px-4 py-3 text-white`}>
            <Link to={"/dashboard/addProduct"}>Add product</Link>
          </li>
        </ul>
      </aside>

      <div className="flex-1 ml-auto mb-6 lg:w-3/4 xl:w-4/5 2xl:w-5/6">
        <div className="sticky top-0 h-16 border-b bg-white dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between px-6 lg:py-2.5">
          <button
            className="md:hidden text-gray-600 dark:text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <button onClick={handleLogout} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="group-hover:text-gray-700 dark:group-hover:text-white">Logout</span>
          </button>

          <div className="relative hidden md:block text-gray-400 focus-within:text-cyan-400">
            <span className="absolute left-4 flex h-6 items-center border-r border-gray-300 pr-3 dark:border-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 fill-current"
                viewBox="0 0 35.997 36.004"
              >
                <path
                  id="Icon_awesome-search"
                  data-name="search"
                  d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                ></path>
              </svg>
            </span>
            <input
              type="search"
              name="leadingIcon"
              id="leadingIcon"
              placeholder="Search here"
              className="outline-none w-full rounded-xl border border-gray-300 py-2.5 pl-14 pr-4 text-sm text-gray-600 transition focus:border-cyan-300 dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
