import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
  // const axiosPublic = useAxiosPublic();

  const {data: allmeals = [], isPending, refetch}= useQuery({
    queryKey: ['menu'],
    queryFn: async ()=>{
      const res = await fetch('/menu.json')
      const data= await res.json()
      return data;
    }
  })
  console.log(allmeals);
  return [allmeals, isPending, refetch];
}
export default useMenu; 