import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useMeals from "../../../../hooks/useMeals";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { useState } from "react";

const ManageItems = () => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [menu] = useMeals(currentPage, pageSize);
  const axiosSecure = useAxiosSecure();

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
      if (result.isConfirmed) {
        axiosSecure.delete(`/menu/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: `Your file has been deleted.`,
              icon: "success",
            });
          }
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
                  <th>{idx + 1}</th>
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
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </>
  );
};

export default ManageItems;
