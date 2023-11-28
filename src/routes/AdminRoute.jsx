import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types"
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/UseAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <>
        <div className="min-h-screen text-center w-full">
          <img className="w-3/4" src="img" />
        </div>
      </>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};
AdminRoute.propTypes = {
    children : PropTypes.node
}

export default AdminRoute;
