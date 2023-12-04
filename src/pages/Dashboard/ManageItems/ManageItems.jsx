import { useState } from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCount from "../../../hooks/useCount";
import useMeals from "../../../hooks/useMeals";

const ManageItems = () => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [menu, manualRefetch] = useMeals(currentPage, pageSize);
  const axiosSecure = useAxiosSecure();
  const [count] = useCount();
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
          const response = await axiosSecure.delete(`/meals/${id}`);
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
                <th>Distributor Name</th>
                <th>Distributor Email</th>
                <th>View Item</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, idx) => (
                <tr key={item._id}>
                  <th>
                    {currentPage > 1
                      ? (currentPage - 1) * pageSize + idx + 1
                      : idx + 1}
                  </th>
                  <td>{item.meal_title}</td>
                  <td>{item.likes}</td>
                  <td>{item.reviews}</td>
                  <td>{item.admin_name}</td>
                  <td>${item.admin_email}</td>
                  <th>
                    <Link to={`/meal/${item._id}`}>
                      <button className="btn btn-ghost btn-lg">
                        <FaEye className="text-red-500 " />
                      </button>
                    </Link>
                  </th>
                  <th>
                    <Link to={`/dashboard/updateItem/${item._id}`}>
                      <button className="btn btn-ghost btn-lg">
                        <FaEdit className="text-red-500 " />
                      </button>
                    </Link>
                  </th>
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

export default ManageItems;
