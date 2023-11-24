import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import NavLinks from "../NavLinks/NavLinks";
const Navbar = () => {
  return (
    <div className="w-full navbar bg-base-300">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1 px-2 mx-2  ">
        <Link to="/">
          <img className="w-20" src={logo} alt="" />
        </Link>
        {/* <Link to="/">
          <h2 className="font-bold text-3xl ml-3 text-red-500">
            Hoster <span className="text-blue-500">Management</span>
          </h2>
        </Link> */}
      </div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
          <NavLinks />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
