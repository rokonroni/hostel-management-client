import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/UseAdmin";
import useAuth from "../hooks/useAuth";
import Logo from "../assets/logo.png";

const Dashboard = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();

  return (
    <>
      <div className="flex">
        <div className="container lg:w-[350px] shrink-0 w-[250px]  mx-auto bg-white">
          <aside
            className="group/sidebar flex flex-col   transition-all duration-300 ease-in-out m-0 fixed z-40 inset-y-0 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start"
            id="sidenav-main"
          >
            <div className="flex shrink-0 px-8 items-center justify-between h-[96px]">
              <NavLink
                className="transition-colors mx-auto justify-center flex  duration-200 ease-in-out"
                to="/"
              >
                <img alt="Logo" src={Logo} className="inline w-1/2" />
              </NavLink>
            </div>
            <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200" />
            <div className="flex items-center justify-between px-8 py-5">
              <div className="flex items-center mr-5">
                <div className="mr-5">
                  <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                    <img
                      className="w-[80px] shrink-0 inline-block rounded-[.95rem]"
                      src={user.photoURL}
                      alt="avatar image"
                    />
                  </div>
                </div>
                <div className="mr-2 ">
                  <p className=" w-full dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-400/90 text-secondary-inverse">
                    {user.displayName}
                  </p>
                  <span className="text-secondary-dark dark:text-stone-500 font-medium block text-[0.85rem]">
                    {user.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200" />
            <div className="relative  overflow-y-scroll">
              <div className="flex flex-col pl-3 my-5 w-full font-medium">
                {/* menu item */}
                {isAdmin ? (
                  <>
                    <div>
                      <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <NavLink
                          to="/dashboard/AdminProfile"
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "bg-none"
                              : isActive
                              ? "text-[#FF444A] font-bold text-lg "
                              : "font-bold text-lg hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
                          }
                        >
                          Admin Profile
                        </NavLink>
                      </span>
                    </div>
                    <div>
                      <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <NavLink
                          to="/dashboard/manageUsers"
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "bg-none"
                              : isActive
                              ? "text-[#FF444A] font-bold text-lg "
                              : "font-bold text-lg hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
                          }
                        >
                          Manage Users
                        </NavLink>
                      </span>
                    </div>
                    <div>
                      <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <NavLink
                          to="/dashboard/addMeal"
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "bg-none"
                              : isActive
                              ? "text-[#FF444A] font-bold text-lg "
                              : "font-bold text-lg hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
                          }
                        >
                          Add Meal
                        </NavLink>
                      </span>
                    </div>
                    <div>
                      <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <NavLink
                          to="/dashboard/allMeals"
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "bg-none"
                              : isActive
                              ? "text-[#FF444A] font-bold text-lg "
                              : "font-bold text-lg hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
                          }
                        >
                          All Meals
                        </NavLink>
                      </span>
                    </div>
                    <div>
                      <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <NavLink
                          to="/dashboard/allReviews"
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "bg-none"
                              : isActive
                              ? "text-[#FF444A] font-bold text-lg "
                              : "font-bold text-lg hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
                          }
                        >
                          All reviews
                        </NavLink>
                      </span>
                    </div>
                    <div>
                      <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <NavLink
                          to="/dashboard/serveMeals"
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "bg-none"
                              : isActive
                              ? "text-[#FF444A] font-bold text-lg "
                              : "font-bold text-lg hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
                          }
                        >
                          Serve Meals
                        </NavLink>
                      </span>
                    </div>
                    <div>
                      <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <NavLink
                          to="/dashboard/upcomingMeals"
                         className={({ isActive, isPending }) =>
                            isPending
                              ? "bg-none"
                              : isActive
                              ? "text-[#FF444A] font-bold text-lg "
                              : "font-bold text-lg hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
                          }
                        >
                          Upcoming Meals
                        </NavLink>
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <NavLink
                          to="/dashboard/userProfile"
                         className={({ isActive, isPending }) =>
                            isPending
                              ? "bg-none"
                              : isActive
                              ? "text-[#FF444A] font-bold text-lg "
                              : "font-bold text-lg hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
                          }
                        >
                          My Profile
                        </NavLink>
                      </span>
                    </div>
                    <div>
                      <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <NavLink
                          to="/dashboard/requestedMeals"
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "bg-none"
                              : isActive
                              ? "text-[#FF444A] font-bold text-lg "
                              : "font-bold text-lg hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
                          }
                        >
                          Requested Meals
                        </NavLink>
                      </span>
                    </div>
                    <div>
                      <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <NavLink
                          to="/dashboard/reviews"
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "bg-none"
                              : isActive
                              ? "text-[#FF444A] font-bold text-lg "
                              : "font-bold text-lg hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
                          }
                        >
                          My Reviews
                        </NavLink>
                      </span>
                    </div>
                  </>
                )}
                {/* menu item */}

                {/* menu item */}
                <div className="block pt-5 pb-[.15rem]">
                  <div className="px-4 py-[.65rem]">
                    <span className="font-semibold text-[0.95rem] uppercase dark:text-neutral-500/80 text-secondary-dark">
                      Applications
                    </span>
                  </div>
                </div>
                {/* menu item */}
                <div>
                  <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                    <NavLink
                      to="/"
                     className={({ isActive, isPending }) =>
                            isPending
                              ? "bg-none"
                              : isActive
                              ? "text-[#FF444A] font-bold text-lg "
                              : "font-bold text-lg hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
                          }
                    >
                      Home
                    </NavLink>
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div className="w-full h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
