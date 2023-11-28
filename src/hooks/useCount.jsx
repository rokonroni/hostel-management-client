import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useCount = () => {
  const axiosPublic = useAxiosPublic();
 const {
    data: count = 0
  } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const res = await axiosPublic.get("/mealsCount");
      return res.data.count;
    }
  });

  return [count];
}

export default useCount;
