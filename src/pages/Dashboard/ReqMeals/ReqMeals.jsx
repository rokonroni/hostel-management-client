import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import useReqMeals from "../../../hooks/useReqMeals";
import useReqCount from "../../../hooks/useReqCount";

const ReqMeals = () => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [allmeals, manualRefetch] = useReqMeals(currentPage, pageSize);
  const axiosSecure = useAxiosSecure();
  const [count] = useReqCount();
  const numberOfPages = Math.ceil(count / pageSize);


  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/reqMeals/${id}`);
          if (response.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: `Your meal has been deleted.`,
              icon: "success",
            });
            manualRefetch(); // Trigger manual refetch on successful deletion
          }
        } catch (error) {
          console.error("Error deleting meal:", error);
        }
      }
    });
  };

  return (
    <>
      <div>
        <SectionTitle title={"MANAGE ALL ITEMS"} subTitle={"---Hurry Up!---"} />
      </div>
      <div>
        <div className="overflow-x-hidden mt-6 ">
          <table className="table">
            {/* head */}
            <thead className="text-white font-semibold ">
              <tr className="bg-yellow-800 ">
                <th>#</th>
                <th>Meal Title</th>
                <th>Total Likes</th>
                <th>Total Reviews</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allmeals.map((item, idx) => (
                <tr key={item._id}>
                  <th>
                    {currentPage > 1
                      ? (currentPage - 1) * pageSize + idx + 1
                      : idx + 1}
                  </th>
                  <td>{item?.mealDetails?.meal_title}</td>
                  <td>{item?.mealDetails?.likes}</td>
                  <td>{item?.mealDetails?.reviews}</td>
                  <td>{item.status}</td>

                  <th>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-ghost btn-lg"
                    >
                      <FaTrashAlt className="text-red-500 " />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={handlePrevPage}
          className={`btn ${currentPage === 1 ? "btn-disabled" : ""}`}
        >
          Prev
        </button>
        {Array.from({ length: numberOfPages }, (_, index) => (
          <button
            className={`mx-2 btn my-5 active:bg-gray-700  ${
              index + 1 === currentPage ? "active" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
            key={index}
            style={{
              backgroundColor: index + 1 === currentPage ? "gray" : "initial",
              color: index + 1 === currentPage ? "white" : "black",
            }}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className={`btn ${
            currentPage === numberOfPages ? "btn-disabled" : ""
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ReqMeals;
