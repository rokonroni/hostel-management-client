import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const AddMeal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Perform Axios POST request to add meal data to the database
      const response = await axios.post("YOUR_API_ENDPOINT", data);

      // Check if the request was successful
      if (response.status === 200) {
        // Show success toast/sweet-alert
        Swal.fire({
          title: "Success!",
          text: "Meal added successfully.",
          icon: "success",
        });
      } else {
        // Show error toast/sweet-alert
        Swal.fire({
          title: "Error!",
          text: "Failed to add meal.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
        <SectionTitle title={"Add a meal"} subTitle={" ---Want to add a meal??---"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Add your form fields here */}
        <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                Meal title
              </label>
              <input
                type="text"
                name="name"
                {...register("meal_title", { required: true })}
                placeholder="Enter meal title"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.name && (
                <span className="text-red-600 mt-2 ">*Title is required</span>
              )}
            </div>

        {/* Repeat the above pattern for other form fields */}

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Meal
          </button>
          <button
            type="button"
            onClick={() => {} /* Handle Add to Upcoming */}
            className="bg-green-500 text-white px-4 py-2 rounded-md ml-4"
          >
            Add to Upcoming
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMeal;
