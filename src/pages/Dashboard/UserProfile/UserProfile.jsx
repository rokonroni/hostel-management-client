import useAuth from "../../../hooks/useAuth";

const UserProfile = () => {
    const {user} = useAuth();
  return (
      <div >
        <div className="bg-white shadow-xl rounded-lg py-3">
          <div className="photo-wrapper p-2">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={user.photoURL}
            />
          </div>
          <div className="p-2 text-center  ">
            <div className="badge p-4 rounded-lg text-center badge-primary">Bronze</div>
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
              {user.displayName}
            </h3>
            <div className="text-center text-gray-400 text-xs font-semibold">
              <p>Bronze Level Customer</p>
            </div>
            
          </div>
        </div>
      </div>
  );
};

export default UserProfile;
