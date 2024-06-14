import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/firebase.config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../Components/Auth/GoogleLogin.jsx";

export default function Login() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const from = "/"; // Default value if location state is undefined
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            // Sign in the user with email and password
            await signInWithEmailAndPassword(auth, email, password); // Correct usage

            // Send user data to backend for login
            const response = await fetch("https://product-management-dashboard-with.onrender.com/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }), // Send email and password to backend
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            // Extract the token from the response
            const data = await response.json();
            const token = data.token;

            // Store the token in local storage
            localStorage.setItem("token", token);

            // Redirect to dashboard or perform other actions after successful login
            navigate(from, { replace: true });
        } catch (error) {
            // Handle login error
            setError("Invalid email or password. Please try again.");
        }
    };

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, loading, navigate, from]);

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content grid grid-cols-1 lg:grid-cols-2 w-full mx-auto">

                <div className="text-center lg:text-left p-6">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Sign in to create an account and access exclusive courses.
                    </p>
                </div>


                <div className="card shadow-2xl bg-base-100 max-w-lg mx-auto lg:mx-0">
                    <form onSubmit={handleSubmit} className="card-body p-6 ">
                        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="input input-bordered w-full"
                                required
                            />
                            <Link to="#" className="label text-sm text-blue-500">
                                Forgot password?
                            </Link>
                        </div>

                        <div className="form-control mt-2">
                            <button type="submit" className="btn btn-primary w-full">Login</button>
                            <p className="text-center mt-4">
                                Don&apos;t have an account?{" "}
                                <Link to="/register" className="text-orange-500">Register</Link>
                            </p>
                        </div>
                    </form>
                    <div className="w-full">
                        <div className="flex flex-col gap-2 mx-7 mb-7">
                            <GoogleLogin />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}