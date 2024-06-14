import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase.config.js";
import GoogleLogin from "../Components/Auth/GoogleLogin.jsx";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        phoneNumber: "",
        photoURL: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    // Handling form field changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            // eslint-disable-next-line no-unused-vars
            const user = userCredential.user;

            // Send user data to backend for registration
            await fetch("https://product-management-dashboard-with.onrender.com/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((res) => res.json())
                .then((data) => {
                    // Displaying success message and redirecting to login after a delay
                    setSuccessMessage("Registration successful. Redirecting to login...");
                    setTimeout(() => {
                        navigate("/login");
                    }, 3000);
                    console.log("token: ", data?.token);
                    // Storing the JWT token received from backend in local storage
                    localStorage.setItem("token", data?.token);
                })
        }
        catch (error) {
            setError(error.message || "Registration failed. Please try again later.");
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content grid grid-cols-1 lg:grid-cols-2 w-full mx-auto">

                <div className="text-center lg:text-left p-6">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Sign up to create an account and access exclusive courses.
                    </p>
                </div>

                <div className="card shadow-2xl bg-base-100 max-w-lg mx-auto lg:mx-0">
                    <form onSubmit={handleSubmit} className="card-body p-6">
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="displayName"
                                value={formData.displayName}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
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
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                name="photoURL"
                                value={formData.photoURL}
                                onChange={handleChange}
                                placeholder="Enter your photo URL"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                        <div className="form-control mt-2">
                            <button type="submit" className="btn btn-primary w-full">Register</button>
                            <p className="text-center mt-4">
                                Already have an account?{" "}
                                <Link to="/login" className="text-orange-500">Login</Link>
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