import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import AllUsers from "../pages/Dashboard/UserProfile/AllUsers/AllUsers";
import ManageItems from "../pages/Dashboard/UserProfile/ManageItems/ManageItems";

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
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children:[
      // users routes
      {
        path: "userProfile",
        element: <UserProfile />
      },
      {
        path: "allMeals",
        element: <ManageItems />
      },
      



      // admin only routes
      {
        path: "manageUsers",
        element: <AllUsers />
      }
    ]
  }
]);
export default router;
