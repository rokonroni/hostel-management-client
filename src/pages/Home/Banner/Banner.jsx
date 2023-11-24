import { useState } from "react";
import PropTypes from "prop-types";

const Banner = ({ handleSearchCategory }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setSearchText(inputText);
    handleSearchCategory(inputText);
  };

  const handleSearchClick = () => {
    handleSearchCategory(searchText);
  };

  const backgroundImageUrl = "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const bannerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    position: "relative",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Adjust the overlay color and opacity here
  };

  return (
    <div className="h-[60vh] flex flex-col justify-center items-center text-center rounded-b-lg" style={bannerStyle}>
      <div style={overlayStyle}></div>
      <h1 className="text-5xl mb-6 font-bold text-black z-10 pt-10 px-5">
        Find your favorite meal with your <span className="text-red-500">Secial Menu</span>
      </h1>
      <p className="text-xl text-gray-700 z-10 mb-6 px-5">
        Explore a wide range of meal opportunities and discover your perfect career path. Start your journey today.
      </p>
      <div className="join w-full px-5 lg:px-0 lg:w-1/3 z-10 pb-10">
        <input
          className="input w-full input-bordered join-item focus:outline-none"
          placeholder="Search here...."
          value={searchText}
          onChange={handleInputChange}
        />
        <button
          onClick={handleSearchClick}
          className="btn font-semibold text-white join-item rounded-md bg-[#FF444A]"
        >
          Search
        </button>
      </div>
    </div>
  );
};

Banner.propTypes = {
  handleSearchCategory: PropTypes.func.isRequired
};

export default Banner;
