import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../components/provider/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const navlink = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline font-bold text-white" : "hover:font-bold"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline font-bold text-white" : "hover:font-bold"
          }
          to={"/allvisa"}
        >
          All visas
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline font-bold text-white" : "hover:font-bold"
          }
          to={"/addvisa"}
        >
          Add Visa
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline font-bold text-white" : "hover:font-bold"
          }
          to={"/addedvisa"}
        >
          My added visas
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline font-bold text-white" : "hover:font-bold"
          }
          to={"/visaaplication"}
        >
          My Visa applications
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar fixed z-50  w-full bg-primary text-text ">
        <div className="navbar-start">
          <Link
            to={""}
            className=" mx-4 font-bold font-serif text-text text-2xl"
          >
            VisaNavigator
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-lg">{navlink}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center">
              <div className="flex items-center md:gap-5">
                <h1 className="text-center hidden md:block font-semibold">
                  welcome to {user.displayName} !!!
                </h1>
                <img
                  className=" rounded-full w-8 h-8 mr-3"
                  src={user.photoURL}
                  alt={user.email}
                />
              </div>
              <button
                onClick={signOutUser}
                className="btn hidden border-none lg:flex text-text bg-button  font-bold"
              >
                SignOut
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <NavLink
                to={"/signin"}
                className={({ isActive }) =>
                  isActive
                    ? "btn hidden border-none lg:flex text-button bg-text  font-bold"
                    : "btn hidden lg:flex text-white border border-white bg-button font-bold"
                }
              >
                Sign In
              </NavLink>
              <NavLink
                to={"/signup"}
                className={({ isActive }) =>
                  isActive
                    ? "btn hidden border-none lg:flex text-button bg-text  font-bold"
                    : "btn hidden lg:flex text-white border border-white bg-button font-bold"
                }
              >
                Sign Up
              </NavLink>
            </div>
          )}
          <div className="dropdown z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu text-lg menu-sm dropdown-content right-0 mt-3 z-[1] p-2 shadow bg-[#3b3b3aea] text-white rounded-box w-52"
            >
              {navlink}
              <li className=" justify-center font-bold">
                {user ? (
                  <button
                    onClick={signOutUser}
                    className=" btn py-3 bg-button text-text"
                  >
                    SignOut
                  </button>
                ) : (
                  <Link
                    to={"/signin"}
                    className="btn  border-none lg:flex bg-button py-3 mt-3  font-bold text-text"
                  >
                    Sign In
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
