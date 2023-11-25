import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMeals = (page, pageSize) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: allmeals = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["menu", { page, pageSize }],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meals?page=${page}&pageSize=${pageSize}`);
      return res.data;
    },
  });
  return [allmeals, isPending, refetch];
};
export default useMeals;
