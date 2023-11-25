import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Successfully added an Admin!",
          text: `${user.name} is an Admin Now!`,
          icon: "success",
        });
        refetch();
      }
    });
  };
  const handleDelete = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <>
      <div>
        <SectionTitle
          title={"MANAGE ALL USERS"}
          subTitle={"---How many??---"}
        />
      </div>
      <div className="bg-base-200 p-4 ">
        <div className="flex items-center justify-around">
          <h2 className="text-3xl ">Total Users: {users.length}</h2>
        </div>
        <div className="overflow-x-auto mt-6 ">
          <table className="table ">
            {/* head */}
            <thead className=" text-white font-semibold text-xl ">
              <tr className="bg-sky-600">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <th>{idx + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-ghost btn-md bg-yellow-700"
                      >
                        <FaUsers className="text-white text-2xl" />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user)}
                      className="btn btn-ghost bg-red-500 btn-md"
                    >
                      <FaTrashAlt className="text-white " />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
