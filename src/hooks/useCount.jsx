import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useCount = (link) => {
  const axiosPublic = useAxiosPublic();
 const {
    data: count = 0,
  } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const res = await axiosPublic.get(`${link}`);
      return res.data.count;
    }
  });
  
  return [count];
}

export default useCount;
