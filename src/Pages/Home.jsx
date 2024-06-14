import { Link } from 'react-router-dom';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/firebase.config';
import { useEffect, useState } from 'react';

const Home = () => {
    const [user] = useAuthState(auth);
    const [signOut] = useSignOut(auth);

    const handleLogout = async () => {
        await signOut(); // Calling signOut function to sign out the user
    };

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const currentUser = auth.currentUser;
            if (currentUser?.email) {
                fetch(`https://product-management-dashboard-with.onrender.com/user/${currentUser.email}`)
                    .then((res) => res.json())
                    .then((data) => setUserInfo(data))
                    .catch((error) => {
                        console.error('Error fetching user info:', error);
                    });
            }
        };
        loadUser();
    }, []);

    return (
        <div className="bg-gray-500 min-h-screen flex flex-col items-center justify-center">
            <Link to="/dashboard">
                <button className="btn btn-md text-lg font-medium">Product Management Dashboard</button>
            </Link>

            <div className="flex gap-4 mt-4">
                {!user?.email ? (
                    <>
                        <Link to="/login" className="btn btn-primary text-lg font-medium">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-secondary text-lg font-medium">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <button className="btn btn-accent text-lg font-medium" onClick={handleLogout}>
                            Logout
                        </button>
                        {userInfo && (
                            <div className="avatar">
                                <p className="text-lg text-gray-200">{userInfo.displayName}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
