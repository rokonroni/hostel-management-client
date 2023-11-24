import PropTypes from 'prop-types';
import Meal from '../Meal/Meal';

const Allmeals = ({ meals, selectedCategory }) => {

  const filteredmeals = meals ? meals.filter((meal) => {
    return selectedCategory === "All meals" || meal.meal_type === selectedCategory;
  }) : [];
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 my-5 container mx-auto">
      {
        filteredmeals.map((meal) => <Meal key={meal._id} meal={meal} />)
      }
    </div>
  );
};

Allmeals.propTypes = {
  meals: PropTypes.array,
  selectedCategory: PropTypes.string
};

export default Allmeals;
