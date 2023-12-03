import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMeals = (page, pageSize) => {
  const axiosPublic = useAxiosPublic();

  const { data: allmeals = [], isPending, refetch: manualRefetch } = useQuery({
  queryKey: ["menu", { page, pageSize }],
  queryFn: async () => {
    try {
      const res = await axiosPublic.get(`/meals?page=${page}&pageSize=${pageSize}`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching meals:", error);
      throw error; // Rethrow the error to be caught by the useQuery hook
    }
  },
});
  return [allmeals, isPending, manualRefetch];
};
export default useMeals;
