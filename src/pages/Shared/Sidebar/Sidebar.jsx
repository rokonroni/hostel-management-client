
import NavLinks from "../NavLinks/NavLinks";

const Sidebar = () => {
    return (
       <div className="drawer-side z-20">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <NavLinks />
          </ul>
        </div>
    );
};

export default Sidebar;