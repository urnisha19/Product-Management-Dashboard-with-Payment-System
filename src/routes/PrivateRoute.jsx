import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../Firebase/firebase.config.js";
import LoadingSpinner from "../Components/Shared/LoadingSpinner.jsx";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
    // Getting current user authentication state and loading status
    const [user, loading] = useAuthState(auth);
    let location = useLocation();

    //Display loading spinner while authentication state is being checked
    if (loading) {
        return <LoadingSpinner />
    }

    // Redirect to login page if user is not authenticated
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    // Render the children components if user is authenticated
    return children;
}