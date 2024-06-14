import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase/firebase.config';

const GoogleLogin = () => {
  // Using the Google sign-in hook from Firebase authentication
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      // If user's email is available, prepare user info and send it to backend
      if (result?.user?.email) {
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName || '',
          photoURL: result.user.photoURL || '',
        };

        // Sending user info to backend
        fetch("https://product-management-dashboard-with.onrender.com/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to authenticate');
            }
            return res.json();
          })
          .then((data) => {
            // Storing the JWT token received from backend in local storage
            localStorage.setItem("token", data.token);
            console.log("User info sent to backend successfully:", data);
          })
          .catch((error) => {
            console.error("Error sending user info to backend:", error);
          });
      }
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="px-5 py-3 bg-yellow-500 text-white w-full rounded-lg"
      >
        Google Login
      </button>
    </div>
  );
};

export default GoogleLogin;
