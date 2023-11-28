import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
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
  const [count] = useCount("/mealsCount");
  console.log(count);
  const numberOfPages = Math.ceil(count / pageSize);
  console.log(numberOfPages);
  const pages = [...Array(numberOfPages).keys()];

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
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
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        axiosSecure.delete(`/meals/${id}`).then((res) => {
          console.log(res);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: `Your meal has been deleted.`,
              icon: "success",
            });
          }
          manualRefetch();
        });
      }
    });
  };

  return (
    <>
      <div>
        <SectionTitle title={"MANAGE ALL ITEMS"} subTitle={"---Hurry Up!---"} />
      </div>
      <div>
        <div className="overflow-x-auto mt-6 ">
          <table className="table">
            {/* head */}
            <thead className=" text-white font-semibold text-xl ">
              <tr className="bg-yellow-800 ">
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
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
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.meal_image} />
                      </div>
                    </div>
                  </td>
                  <td>{item.meal_title}</td>
                  <td>${item.price}</td>
                  <th>
                    <Link to={`/dashboard/updateItem/${item._id}`}>
                      <button
                        // onClick={() => handleUpdate(item._id)}
                        className="btn btn-ghost btn-lg"
                      >
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
        {pages.map((page) => (
          <button
            className={`mx-2 btn my-5 active:bg-gray-700  ${
              page + 1 === currentPage ? "active" : ""
            }`}
            onClick={() => setCurrentPage(page + 1)}
            key={page}
            style={{
              backgroundColor: page + 1 === currentPage ? "gray" : "initial",
              color: page + 1 === currentPage ? "white" : "black",
            }}
          >
            {page + 1}
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
