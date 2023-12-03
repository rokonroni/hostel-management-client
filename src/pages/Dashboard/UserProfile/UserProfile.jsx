import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import bronzeImg from "../../../assets/bronze.png";
import goldImg from "../../../assets/gold-badge.png"

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: mealPackage} = useQuery({
    queryKey: [user?.email, "Package"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/package/${user.email}`);
      return res.data.package;
    },
  });

  const renderBadges = () => {
    if (mealPackage === "Bronze") {
      return (
        <>
            <div>
              <img className="w-14 " src={bronzeImg} alt="" />
            </div>
        </>
      );
    } else if (mealPackage === "Silver") {
      return (
       <>
            <div>
              <img className="w-20 " src={goldImg} alt="" />
            </div>
        </>
      );
    } else if (mealPackage === "Gold") {
      return (
        <>
            <div>
              <img className="w-20 " src={goldImg} alt="" />
            </div>
        </>
      );
    } else if (mealPackage === "Platinum") {
      return (
        <>
            <div>
              <img className="w-20 " src={goldImg} alt="" />
            </div>
        </>
      );
    }
  };

  return (
    <div>
      <div className="bg-white relative shadow-xl rounded-lg py-3">
        <div className="photo-wrapper p-2">
          <img
            className="w-32 h-32 rounded-full mx-auto"
            src={user.photoURL}
            alt={user.displayName}
          />
        </div>
        <div className="p-2 text-center">
          <div className="absolute top-[40%] right-[40%] ">
            {renderBadges()}
          </div>
          <div className="text-center mt-6 text-gray-400 text-xs font-semibold">
            <p>{mealPackage} Level Customer</p>
          </div>
          <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
            {user.displayName}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
