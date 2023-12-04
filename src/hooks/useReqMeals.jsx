import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useReqMeals = (page, pageSize) => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const { data: allmeals = [], isPending, refetch: manualRefetch } = useQuery({
  queryKey: ["menu", { page, pageSize }],
  queryFn: async () => {
    try {
      const res = await axiosSecure.get(`/reqMeals?page=${page}&pageSize=${pageSize}&userEmail=${user.email}`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching meals:", error);
      throw error; // Rethrow the error to be caught by the useQuery hook
    }
  },
});
  return [allmeals, isPending, manualRefetch];
};
export default useReqMeals;
