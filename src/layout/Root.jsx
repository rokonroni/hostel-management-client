import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import Sidebar from "../pages/Shared/Sidebar/Sidebar";

const Root = () => {
  const location = useLocation();
  const noHeadedFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {noHeadedFooter || <Navbar />}
          <Outlet />
        </div>
        <Sidebar />
      </div>
       {noHeadedFooter || <Footer/>}
    </>
  );
};

export default Root;
