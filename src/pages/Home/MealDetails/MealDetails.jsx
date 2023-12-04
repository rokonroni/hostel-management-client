import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MealDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: mealPackage } = useQuery({
    queryKey: [user?.email, "Package"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/package/${user.email}`);
      return res.data.package;
    },
  });

  const {
    data: mealDetails,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meals/${id}`);
      return res.data;
    },
  });
  //   const dateTimeString = mealDetails?.time_date;
  // const dateTime = new Date(dateTimeString);
  // const dateOnlyString = dateTime.toISOString().split('T')[0];

  const handleLikeClick = async () => {
    if (user) {
      try {
        const response = await axiosSecure.post(`/meal/like/${id}`);
        if (response.data.success) {
          setLikeCount(likeCount + 1);
          setIsLiked(true);
          refetch();
        }
      } catch (error) {
        console.error("Error liking meal:", error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have to log in first to request a meal!",
        footer: '<a href="/login" >Login Now</a>',
      });
    }
  };

  const handleMealRequest = () => {
    if (user) {
      if (mealPackage === "Bronze") {

        const reqMeal = {
          mealDetails: mealDetails,
          userEmail: user.email,
        };
        axiosSecure.post("/reqMeal", reqMeal).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: `${mealDetails.meal_title} added Successfully` ,
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You are already book a package!",
          footer: '<a href="/dashboard" >See Package</a>',
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have to log in first to request a meal!",
        footer: '<a href="/login" >Login Now</a>',
      });
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-8 text-red-500">
        Error loading meal details
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 p-4 bg-white rounded-lg shadow-lg">
      {/* Render your meal details here */}
      {mealDetails && (
        <>
          <img
            src={mealDetails.meal_image}
            className="w-full rounded-md mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">
            {mealDetails.meal_title}
          </h2>
          <p className="text-gray-600 mb-4">{mealDetails.description}</p>
          <p className="text-gray-700 mb-2">
            Ingredients: {mealDetails.ingredients}
          </p>
          <p className="text-gray-700 mb-2">
            Post Time: {mealDetails.time_date}
          </p>
          <p className="text-gray-700 mb-2">Total Like: {mealDetails.likes}</p>
          <p className="text-gray-700 mb-2">Rating: {mealDetails.rating}</p>

          <p className="text-gray-700">Reviews: {mealDetails.reviews}</p>
          <p className="text-gray-700">Distributor: {mealDetails.admin_name}</p>

          <div className="flex mt-6">
            <button
              onClick={handleLikeClick}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
              disabled={isLiked}
            >
              {isLiked ? (
                <FaHeart className="mr-2" />
              ) : (
                <FaRegHeart className="mr-2" />
              )}
              {isLiked ? "Loved!" : "Like"}
            </button>
            <button
              onClick={handleMealRequest}
              className="bg-green-500 text-white px-4 py-2 rounded-md ml-4 focus:outline-none"
            >
              Meal Request
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MealDetails;
