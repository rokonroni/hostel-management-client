import { Rating } from "@smastrom/react-rating";
import PropTypes from "prop-types";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router-dom";

const Meal = ({ meal }) => {
  const { meal_image, meal_title, rating, price,reviews } = meal;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover object-center"
        src={meal_image}
        alt={meal_title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{meal_title}</div>
        <div className="flex items-center mb-4">
          <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
          <p> (Reviews {reviews})</p>
        </div>
        <p className="text-gray-700 text-base">Price: ${price}</p>
      </div>
      <div className="px-6 pt-4 w-full mb-4 ">
        <Link
          to={`/meal/${meal._id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full btn  py-2 px-4 rounded-lg mb-4 focus:outline-none focus:shadow-outline"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

Meal.propTypes = {
  meal: PropTypes.object.isRequired,
};
export default Meal;
