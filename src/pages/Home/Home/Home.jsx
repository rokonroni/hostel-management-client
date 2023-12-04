import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useMeals from "../../../hooks/useMeals";
import AllTab from "../AllTab/AllTab";
import Allmeals from "../Allmeals/Allmeals";
import Banner from "../Banner/Banner";
import PriceTable from "../PriceTable/PriceTable";

const Home = () => {
  // const [allmeals, isPending] = useMeals();

  const [allmeals, isPending] = useMeals(1,20);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All meals");
  const handleSearchCategory = (searchText) => {
    setSearchText(searchText);
  };

  const filteredmeals = allmeals?.filter((meal) => {
    return (
      meal.meal_type?.toLowerCase().includes(searchText.toLowerCase()) ||
      meal.meal_type?.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });
  if (isPending) {
    return (
      <>
        <div className=" text-center h-[60vh] ">
          <div className="mt-48 loading loading-infinity loading-lg"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Hostel Management | Home</title>
      </Helmet>
      <div className="space-y-11 mb-10">
        <Banner handleSearchCategory={handleSearchCategory} />
        <h2 className="text-center text-4xl font-semibold uppercase underline text-blue-500">
          Filter meal by Category
        </h2>
        <AllTab
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Allmeals meals={filteredmeals} selectedCategory={selectedCategory} />
        <PriceTable />
      </div>
    </>
  );
};

export default Home;
