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
import AdminRoute from "./AdminRoute";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import MealDetails from "../pages/Home/MealDetails/MealDetails";
import Meals from "../pages/Meals/Meals";
import ErrorPage from "../pages/Shared/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
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
        path: "meal/:id",
        element: <MealDetails />,
      },
      {
        path: "meals",
        element: <Meals />,
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
    // errorElement: <ErrorPage/>,
    children: [
      // users routes
      {
        path: "",
        element: <UserProfile />,
      },
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
        element: <AdminRoute><AllUsers /></AdminRoute> ,
      },
      {
        path: "updateItem/:id",
        element: <AdminRoute><UpdateItem /></AdminRoute> ,
        loader: ({params})=>fetch (`http://localhost:5000/meals/${params.id}`)

      },
      {
        path: "addMeal",
        element: <AdminRoute><AddMeal /></AdminRoute>,
      },
    ],
  },
]);
export default router;
