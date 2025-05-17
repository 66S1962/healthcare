import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Use user data from Redux if available
  const user = useSelector((state) => state.user?.user);  // Optional chaining
  const token = localStorage.getItem("token");

  // Check if the user or token exists
  if (user || token) {
    return children;  // If user is authenticated, render the children (protected route)
  } else {
    return <Navigate to="/login" replace />;  // If not authenticated, redirect to login page
  }
};

export default ProtectedRoute;
