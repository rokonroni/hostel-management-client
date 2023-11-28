import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_Image_Upload_Token;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    admin_email,
    admin_name,
    description,
    ingredients,
    meal_title,
    meal_type,
    likes,
    reviews,
    rating,
    time_date,
    price,
    image,
  } = useLoaderData();

  useEffect(() => {
    // Set the default value for the meal_image field to the existing image URL
    setValue("meal_image", image);
  }, [image, setValue]);

 const onSubmit = async (data) => {
  let imageURL = image; // Default to existing image

  // Check if a new image is selected
  if (data.meal_image && data.meal_image[0]) {
    const imageFile = { image: data.meal_image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    if (res.data.success) {
      imageURL = res.data.data.display_url;
    }
  }

  const mealItem = {
    admin_email: data.admin_email,
    admin_name: data.admin_name,
    description: data.description,
    ingredients: data.ingredients,
    meal_title: data.meal_title,
    meal_type: data.meal_type,
    likes: 0,
    reviews: 0,
    rating: 0,
    time_date: data.time_date,
    price: parseFloat(data.price),
    image: imageURL,
  };

  const mealRes = await axiosSecure.patch(`/meals/${_id}`, mealItem);
  if (mealRes.data.modifiedCount > 0) {
    reset();
    Swal.fire({
      title: 'Successfully update an Item!',
      text: `${data.meal_title} is updated to the menu.`,
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }
};


  return (
    <div className="max-w-2xl mx-auto my-8">
      <SectionTitle
        title={"Update a meal"}
        subTitle={" ---Want to update a meal??---"}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="py-6 ">
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            htmlFor="mealTitle"
          >
            Meal Title
          </label>
          <input
            type="text"
            name="meal_title"
            defaultValue={meal_title}
            {...register("meal_title", { required: true })}
            placeholder="Enter meal title"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.meal_title && (
            <span className="text-red-600 mt-2 ">*Title is required</span>
          )}
        </div>

        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            htmlFor="mealType"
          >
            Meal Type
          </label>
          <select
            defaultValue={meal_type}
            {...register("meal_type", { required: true })}
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option disabled>Select a category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
          {errors.meal_type && (
            <span className="text-red-600 mt-2 ">*Meal Type is required</span>
          )}
        </div>

        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            htmlFor="ingredients"
          >
            Ingredients
          </label>
          <input
            defaultValue={ingredients}
            type="text"
            name="ingredients"
            {...register("ingredients", { required: true })}
            placeholder="Enter ingredients"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.ingredients && (
            <span className="text-red-600 mt-2 ">*Ingredients is required</span>
          )}
        </div>

        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            defaultValue={description}
            name="description"
            {...register("description", { required: true })}
            placeholder="Enter meal description"
            className="form-textarea block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.description && (
            <span className="text-red-600 mt-2 ">*Description is required</span>
          )}
        </div>

        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="text"
            name="price"
            defaultValue={price}
            {...register("price", { required: true })}
            placeholder="Enter meal price"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.price && (
            <span className="text-red-600 mt-2 ">*Price is required</span>
          )}
        </div>

        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            htmlFor="timeDate"
          >
            Time/Date
          </label>
          <input
            defaultValue={time_date}
            type="datetime-local"
            name="time_date"
            {...register("time_date", { required: true })}
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.time_date && (
            <span className="text-red-600 mt-2 ">*Time/Date is required</span>
          )}
        </div>

        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            htmlFor="adminName"
          >
            Admin/distributor Name
          </label>
          <input
            type="text"
            name="admin_name"
            defaultValue={admin_name}
            {...register("admin_name", { required: true })}
            placeholder="Enter admin/distributor name"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.admin_name && (
            <span className="text-red-600 mt-2 ">
              *Admin/distributor Name is required
            </span>
          )}
        </div>

        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            htmlFor="adminEmail"
          >
            Admin/distributor Email
          </label>
          <input
            type="email"
            name="admin_email"
            defaultValue={admin_email}
            {...register("admin_email", { required: true })}
            placeholder="Enter admin/distributor email"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.admin_email && (
            <span className="text-red-600 mt-2 ">
              *Admin/distributor Email is required
            </span>
          )}
        </div>

        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            htmlFor="mealImage"
          >
            Meal Image
          </label>
          <input
            type="file"
            accept="image/*"
            name="meal_image"
            {...register("meal_image")}
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.meal_image && (
            <span className="text-red-600 mt-2">*Meal Image is required</span>
          )}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md ml-4"
          >
            Update Meal
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateItem;
