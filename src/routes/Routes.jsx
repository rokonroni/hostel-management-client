import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import Root from "../layout/Root";
import AddMeal from "../pages/Dashboard/AddMeal/AddMeal";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import PaymentInfo from "../pages/Dashboard/PaymentInfo/PaymentInfo";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import Home from "../pages/Home/Home/Home";
import MealDetails from "../pages/Home/MealDetails/MealDetails";
import Login from "../pages/Login/Login";
import Meals from "../pages/Meals/Meals";
import ErrorPage from "../pages/Shared/ErrorPage/ErrorPage";
import SignUp from "../pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import ReqMeals from "../pages/Dashboard/ReqMeals/ReqMeals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
        element: (
          <PrivateRoute>
            <PaymentInfo />
          </PrivateRoute>
        ),
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
        path: "userProfile",
        element: <UserProfile />,
      },
      {
        path: "requestedMeals",
        element: <ReqMeals />,
      },
      

      // admin only routes
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "allMeals",
        element:<AdminRoute><ManageItems /></AdminRoute> ,
      },
      {
        path: "adminProfile",
        element:<AdminRoute><AdminProfile /></AdminRoute> ,
      },
      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://hostel-management-server-phi.vercel.app/meals/${params.id}`
          ),
      },
      {
        path: "addMeal",
        element: (
          <AdminRoute>
            <AddMeal />
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;
