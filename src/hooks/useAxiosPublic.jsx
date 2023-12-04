import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://hostel-management-server-phi.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
