import { Link, NavLink } from "react-router-dom";
import defultAvatar from "../../../assets/defult_Avatar.png";
import useAuth from "../../../hooks/useAuth";


const NavLinks = () => {
  const { user, logOut } = useAuth();

  return (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "bg-none"
              : isActive
              ? "text-[#FF444A] font-bold underline text-lg "
              : "font-bold underline text-lg hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
          }
        >
          Home
        </NavLink>
      </li>
      <div>
        {user?.email ? (
          <>
            <div className="dropdown dropdown-end relative group">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL ? user?.photoURL : defultAvatar} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu font-bold menu-sm dropdown-content bg-slate-300 z-[1] p-2 shadow rounded-xl w-52 absolute top-full right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
              >
                <li className="hover:">
                  <p disabled className="justify-between disabled">
                    {user?.displayName}
                  </p>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "bg-none"
                        : isActive
                        ? "text-[#FF444A] font-bold underline text-lg "
                        : "font-bold underline text-lg hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                  <button
                    onClick={()=>logOut()}
                    className="btn bg-red-400 hover:bg-red-600 w-full text-xl mt-3 btn-sm mb-2  items-center "
                  >
                    Logout
                  </button>
              </ul>
            </div>
          </>
        ) : (
          <ul>
            <li>
              <Link to="/login">
                <button className="btn btn-sm bg-transparent text-blue-600 border-blue-600 hover:bg-transparent hover:text-red-600 hover:font-bold hover:border-red-600 ">
                  Join US
                </button>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default NavLinks;
