import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import Root from "../layout/Root";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import PaymentInfo from "../pages/Dashboard/PaymentInfo/PaymentInfo";
import AddMeal from "../pages/Dashboard/AddMeal/AddMeal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "checkout/:type",
        element: <PrivateRoute><PaymentInfo /></PrivateRoute>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // users routes
      {
        path: "userProfile",
        element: <UserProfile />,
      },
      {
        path: "allMeals",
        element: <ManageItems />,
      },
      

      // admin only routes
      {
        path: "manageUsers",
        element: <AllUsers />,
      },
      {
        path: "addMeal",
        element: <AddMeal />,
      },
    ],
  },
]);
export default router;
