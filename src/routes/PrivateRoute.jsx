import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types"
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
    const location = useLocation();



    if (loading) {
        return <>
          <div className="min-h-screen text-center w-full">
            <img className="w-3/4" src='img' />
          </div>
        </>
    }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{from:location}} replace/>;
};
PrivateRoute.propTypes = {
    children : PropTypes.node
}
export default PrivateRoute;
