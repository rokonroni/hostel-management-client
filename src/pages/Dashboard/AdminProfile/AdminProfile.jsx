
import useAuth from '../../../hooks/useAuth';

const AdminProfile = () => {
    const {user} = useAuth();
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
          <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
            {user.displayName}
          </h3>
        </div>
      </div>
    );
};

export default AdminProfile;