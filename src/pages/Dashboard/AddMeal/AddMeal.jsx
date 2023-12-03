import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_Image_Upload_Token;
const image_hosting_api = ` https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
console.log(image_hosting_api);

const AddMeal = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = async (data, apiEndpoint) => {
    try {
      const imageFile = { image: data.meal_image[0] };
      const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
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
          time_date: new Date(),
          price: parseFloat(data.price),
          image: res.data.data.display_url,
        };

        const mealRes = await axiosSecure.post(apiEndpoint, mealItem);
        if (mealRes.data.insertedId) {
          reset();
          Swal.fire({
            title: "Successfully Added an Item!",
            text: `${data.meal_title} is added to the menu.`,
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      }
    } catch (error) {
      console.error("Error submitting meal:", error.response.data);
    }
  };

  const onSubmit = (data) => submitForm(data, "/meals");
  const handleUpcomingSubmit = (data) => submitForm(data, "/upcomingMeals");

  return (
    <div className="max-w-2xl mx-auto my-8">
      <SectionTitle
        title={"Add a meal"}
        subTitle={" ---Want to add a meal??---"}
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
            defaultValue="default"
            {...register("meal_type", { required: true })}
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option disabled value="default">
              Select a category
            </option>
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
            htmlFor="adminName"
          >
            Admin/distributor Name
          </label>
          <input
            type="text"
            name="admin_name"
            defaultValue={user.displayName}
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
            defaultValue={user.email}
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
            {...register("meal_image", { required: true })}
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.meal_image && (
            <span className="text-red-600 mt-2 ">*Meal Image is required</span>
          )}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Meal
          </button>
          <button
            type="button"
            onClick={handleSubmit(handleUpcomingSubmit)}
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
