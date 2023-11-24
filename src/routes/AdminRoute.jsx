import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types"
import loadingImg from "../assets/others/loader2.gif";
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
          <img className="w-3/4" src={loadingImg} />
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
