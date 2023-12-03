import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Meal from "../Home/Meal/Meal";

const Meals = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRangeFilter, setPriceRangeFilter] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

const { data: mealsData, fetchNextPage, hasNextPage, isFetching } = useQuery({
  queryKey: ["meals", searchQuery, categoryFilter, priceRangeFilter, pageNumber],
  queryFn: async () => {
    const response = await axiosSecure.get("/meals", {
      params: {
        page: pageNumber,
        search: searchQuery,
        ...(categoryFilter !== "All" && { category: categoryFilter }), // Include category only if it's not "All"
        priceRange: priceRangeFilter,
      },
    });
    return response.data.data;
  },
});

console.log(mealsData);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPageNumber(1); // Reset page number when performing a new search
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    setPageNumber(1);
  };

  const handlePriceRangeFilter = (range) => {
    setPriceRangeFilter(range);
    setPageNumber(1);
  };

  const handleLoadMore = () => {
    fetchNextPage();
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by meal title"
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 mr-2"
        />
        <select
          value={categoryFilter}
          onChange={(e) => handleCategoryFilter(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="All">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          
        </select>
        <select
          value={priceRangeFilter}
          onChange={(e) => handlePriceRangeFilter(e.target.value)}
          className="border p-2"
        >
          <option value="">All Price Ranges</option>
          {/* Add your price range options here */}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        
        {mealsData?.map((meal) => <Meal key={meal._id} meal={meal} />)}
      </div>

      {hasNextPage && (
        <button
          onClick={handleLoadMore}
          disabled={isFetching}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          {isFetching ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Meals;
