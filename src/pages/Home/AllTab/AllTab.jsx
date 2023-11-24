import PropTypes from "prop-types";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Allmeals from "../Allmeals/Allmeals";

const AllTab = ({ meals, selectedCategory, setSelectedCategory }) => {
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto">
      <Tabs selectedTabClassName="bg-blue-300 rounded-sm font-bold ">
        <TabList className="text-center">
          <Tab onClick={() => handleCategoryChange("All meals")}>All meals</Tab>
          <Tab onClick={() => handleCategoryChange("Breakfast")}>Breakfast</Tab>
          <Tab onClick={() => handleCategoryChange("Lunch")}>Lunch</Tab>
          <Tab onClick={() => handleCategoryChange("Dinner")}>Dinner</Tab>
        </TabList>

        <TabPanel className="active:bg-red-500">
          <Allmeals meals={meals} selectedCategory={selectedCategory} />
        </TabPanel>
        
      </Tabs>
    </div>
  );
};
AllTab.propTypes = {
  meals: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default AllTab;
